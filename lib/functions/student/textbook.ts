import { root, Routes } from "ecoledirecte-api-types";

import { makeRequest } from "../util";
import { Student } from "../../account_types";

import { _textbookResSuccess, _textbookDateResSuccess } from "../../types";
import { _textbookDateAssignement, assignement } from "../../types";
import { expandBase64 } from "../util";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getUpcomingAssignementDates(
	id: number,
	token: string
): Promise<{ dates: string[]; token: string }> {
	const body: _textbookResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomework(id), root).href,
		body: { token },
		guard: true,
	});

	const dates = Object.keys(body.data); // .map((date) => new Date(date));

	return { dates, token: body.token || token };
}

/**
 * @param id Account id
 * @param token Auth token
 * @param date Date of the textbook page (YYYY-MM-DD)
 */
export async function getTextbookPage(
	id: number,
	token: string,
	date: string
): Promise<_textbookDateResSuccess> {
	const body: _textbookDateResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomeworkDate(id, date), root).href,
		body: { token },
		guard: true,
	});

	return body;
}

export async function tickAssignement(
	id: number,
	token: string,
	assignement: _textbookDateAssignement,
	state?: boolean
): Promise<{ code: 200; token: string; host: string }> {
	if (!("aFaire" in assignement)) throw Error("No work in this assignement.");
	if (state === undefined) state = !assignement.aFaire?.effectue;

	const data: {
		token: string;
		idDevoirsEffectues?: number[];
		idDevoirsNonEffectues?: number[];
	} = {
		token: token,
	};
	if (state) data.idDevoirsEffectues = [assignement.id];
	if (!state) data.idDevoirsNonEffectues = [assignement.id];

	const body: { code: 200; token: string; host: string } = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomework(id, { verbe: "put" }), root).href,
		body: data,
		guard: true,
	});

	return body;
}

export function cleanAssignements(
	data: {
		date: string;
		matieres: _textbookDateAssignement[];
	},
	student: Student
): assignement[] {
	const assignements = data.matieres;
	const cleaned: assignement[] = assignements.map(v => ({
		id: v.id,
		date: new Date(data.date),
		test: v.interrogation,
		subject: {
			name: v.matiere,
			code: v.codeMatiere,
		},
		teacher: v.nomProf.startsWith(" par ") ? v.nomProf.substr(5) : v.nomProf,
		job: v.aFaire
			? {
					content: expandBase64(v.aFaire.contenu),
					givenAt: new Date(v.aFaire.donneLe),
					toReturnOnline: v.aFaire.rendreEnLigne,
					done: v.aFaire.effectue,
					lastContenuDeSeance: {
						content: expandBase64(v.aFaire.contenuDeSeance.contenu),
						documents: v.aFaire.contenuDeSeance.documents,
					},
					tick: async function (newState?: boolean) {
						if (newState === undefined) newState = !this.done;
						const res = await tickAssignement(
							student._raw.id,
							student.token,
							v,
							newState
						);
						student.token = res?.token || student.token;
						this.done = newState;
						return newState;
					},
			  }
			: undefined,
		contenuDeSeance: {
			homeworkId: v.contenuDeSeance.idDevoir,
			content: expandBase64(v.contenuDeSeance.contenu),
			documents: v.contenuDeSeance.documents,
		},
		_raw: v,
	}));
	return cleaned;
}
