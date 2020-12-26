import { makeRequest } from "../util";

import {
	_textbookResSuccess,
	_textbookDateResSuccess,
	isFailure,
} from "../../types";
import { _textbookDateAssignement, assignement } from "../../types";
import { APIError } from "../../errors";
import { expandBase64 } from "../util";
import { _failureRes } from "../../types/failureRes";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getUpcomingAssignementDates(id: number, token: string) {
	const body: _textbookResSuccess = await makeRequest({
		method: "POST",
		url: `https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte.awp?verbe=get`,
		body: { token },
		guard: true,
	});

	const dates = Object.keys(body.data); // .map((date) => new Date(date));

	return { dates, token: body.token };
}

/**
 * @param id Account id
 * @param token Auth token
 * @param date Date of the textbook page (YYYY-MM-DD)
 */
export async function getTextbookPage(id: number, token: string, date: string) {
	const body: _textbookDateResSuccess = await makeRequest({
		method: "POST",
		url: `https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte/${date}.awp?verbe=get`,
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
) {
	if (!("aFaire" in assignement)) return;
	if (state === undefined) state = !assignement.aFaire?.effectue;

	let data: {
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
		url: `https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte.awp?verbe=put`,
		body: data,
		guard: true,
	});

	console.log(body);
	return body;
}

export function cleanAssignements(
	data: {
		date: string;
		matieres: _textbookDateAssignement[];
	},
	token: string
) {
	const assignements = data.matieres;
	const cleaned: assignement[] = assignements.map((v) => ({
		id: v.id,
		date: new Date(data.date),
		interro: v.interrogation,
		matiere: {
			nom: v.matiere,
			code: v.codeMatiere,
		},
		prof: v.nomProf.startsWith(" par ") ? v.nomProf.substr(5) : v.nomProf,
		aFaire: v.aFaire
			? {
					contenu: expandBase64(v.aFaire.contenu),
					donneLe: new Date(v.aFaire.donneLe),
					rendreEnLigne: v.aFaire.rendreEnLigne,
					effectue: v.aFaire.effectue,
					dernierContenuDeSeance: {
						contenu: expandBase64(v.aFaire.contenuDeSeance.contenu),
						documents: v.aFaire.contenuDeSeance.documents,
					},
					cocher: async function (newState: boolean) {
						const res = await tickAssignement(
							v.aFaire?.idDevoir as number,
							token,
							v,
							newState
						);
						token = res?.token || token;
						this.effectue = newState;
						return newState;
					},
			  }
			: undefined,
		contenuDeSeance: {
			idDevoir: v.contenuDeSeance.idDevoir,
			contenu: expandBase64(v.contenuDeSeance.contenu),
			documents: v.contenuDeSeance.documents,
		},
		_raw: v,
	}));
	return { cleaned, token };
}
