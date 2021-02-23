import { note as _grade } from "ecoledirecte-api-types/v3";

export class Grade {
	name: string;
	value: number | string;
	class: {
		max?: number | string;
		avg?: number | string;
		min?: number | string;
	};
	outOf: number;
	weight: number;
	unweighted: boolean;
	isLetter: boolean;
	date: Date;
	dateTyped: Date;
	periodCode: string;
	subject: {
		code: string;
		name: string;
		subSubjectCode?: string;
	};
	elements: Array<{
		id: number;
		competenceId: number;
		name: string;
		description: string;
		value: string;
	}>;
	qcm?: {
		id: number;
		name: string;
		startsAt: Date;
	};
	_raw: _grade;

	constructor(o: _grade) {
		this.name = o.devoir;
		this.value = betterValue(o);
		this.class = {
			max: !(isNaN(+o.maxClasse) || !o.maxClasse)
				? +o.maxClasse
				: o.maxClasse || undefined,
			avg: !(isNaN(+o.moyenneClasse) || !o.moyenneClasse)
				? +o.moyenneClasse
				: o.moyenneClasse || undefined,
			min: !(isNaN(+o.minClasse) || !o.minClasse)
				? +o.minClasse
				: o.minClasse || undefined,
		};
		this.outOf = +o.noteSur.replace(/,/, ".");
		this.weight = +o.coef;
		this.unweighted = o.nonSignificatif;
		this.isLetter = o.enLettre;
		this.date = new Date(o.date);
		this.dateTyped = new Date(o.dateSaisie);
		this.periodCode = o.codePeriode;
		this.subject = {
			code: o.codeMatiere,
			name: o.libelleMatiere,
			subSubjectCode: o.codeMatiere || undefined,
		};
		this.elements = o.elementsProgramme.map(e => ({
			id: e.idElemProg,
			competenceId: e.idCompetence,
			name: e.libelleCompetence,
			description: e.descriptif,
			value: e.valeur,
		}));
		this.qcm = o.qcm
			? {
					id: o.qcm.idQCM,
					name: o.qcm.titre,
					startsAt: new Date(o.qcm.debute),
			  }
			: undefined;
		this._raw = o;
	}

	//TODO Think of a final solution
	// toJSON(): gradeObject {
	// 	const toReturn: Record<string, unknown> = {};
	// 	for (const [key, value] of Object.entries(this) as [string, unknown][]) {
	// 		toReturn[key] = value;
	// 	}
	// 	return (toReturn as unknown) as gradeObject;
	// }
}

function betterValue(note: _grade): number | string {
	if (note.enLettre) return note.valeur;
	return +note.valeur.replace(/,/, ".");
}
