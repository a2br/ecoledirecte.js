import { Routes, root } from "ecoledirecte-api-types";
import { expandBase64, makeRequest } from "../functions/util";
import { expandedBase64 } from "../types/util";
import { Student } from "../accounts";
import { _textbookDateAssignement } from "../types";

export class Assignement {
	/** @description Unique ID */
	readonly id: number;
	/** @description Date for which the assignement is due */
	readonly date: Date;
	/** @description Whether it represents a test or not */
	readonly test: boolean;
	/** @description Concerned subject */
	readonly subject: {
		name: string;
		code: string;
	};
	/** @description Teacher who created the assignement */
	readonly teacher: string;
	/** @description The homework itself */
	readonly job?: {
		content: expandedBase64;
		givenAt: Date;
		/** @description Whether the homework should be returned through EcoleDirecte */
		toReturnOnline: boolean;
		done: boolean;
		/** @description `contenuDeSeance` of the last course */
		lastContenuDeSeance: {
			content: expandedBase64;
			documents: unknown[];
		};
		tick: (newState?: boolean) => Promise<boolean>;
	};
	/** @description The day's `contenuDeSeance`. May not be displayed in the EcoleDirecte UI if the date is in the future */
	readonly contenuDeSeance?: {
		homeworkId: number;
		content: expandedBase64;
		documents: unknown[];
	};
	/** @description Raw document straight from EcoleDirecte */
	readonly _raw: _textbookDateAssignement;

	constructor(o: _textbookDateAssignement, date: string, student: Student) {
		this.id = o.id;
		this.date = new Date(date);
		this.test = o.interrogation;
		this.subject = {
			name: o.matiere,
			code: o.codeMatiere,
		};
		this.teacher = o.nomProf.startsWith(" par ")
			? o.nomProf.substr(5)
			: o.nomProf;
		this.job = o.aFaire
			? {
					content: expandBase64(o.aFaire.contenu),
					givenAt: new Date(o.aFaire.donneLe),
					toReturnOnline: o.aFaire.rendreEnLigne,
					done: o.aFaire.effectue,
					lastContenuDeSeance: {
						content: expandBase64(o.aFaire.contenuDeSeance.contenu),
						documents: o.aFaire.contenuDeSeance.documents,
					},
					tick: async (newState?: boolean) => {
						if (!this.job) throw new Error("'job' should be here");
						if (newState === undefined) newState = !this.job.done;
						const res = await tickAssignement(
							student._raw.id,
							student.token,
							o,
							newState
						);
						student.token = res?.token || student.token;
						this.job.done = newState;
						return newState;
					},
			  }
			: undefined;
		this.contenuDeSeance = o.contenuDeSeance
			? {
					homeworkId: o.contenuDeSeance.idDevoir,
					content: expandBase64(o.contenuDeSeance.contenu),
					documents: o.contenuDeSeance.documents,
			  }
			: undefined;
		this._raw = o;
	}
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
