import { grade as _grade } from "ecoledirecte-api-types/v3";

export class Grade {
	name: string;
	value: number | string;

	classMax?: number | string;
	classAvg?: number | string;
	classMin?: number | string;

	outOf: number;
	weight: number;
	unweighted: boolean;
	isLetter: boolean;
	date: Date;
	dateTyped: Date;
	periodCode: string;

	subjectCode: string;
	subjectName: string;
	subSubjectCode?: string;

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

		this.classMax = !(isNaN(+o.maxClasse) || !o.maxClasse)
			? +o.maxClasse
			: o.maxClasse || undefined;
		this.classAvg = !(isNaN(+o.moyenneClasse) || !o.moyenneClasse)
			? +o.moyenneClasse
			: o.moyenneClasse || undefined;
		this.classMin = !(isNaN(+o.minClasse) || !o.minClasse)
			? +o.minClasse
			: o.minClasse || undefined;

		this.outOf = +o.noteSur.replace(/,/, ".");
		this.weight = +o.coef;
		this.unweighted = o.nonSignificatif;
		this.isLetter = o.enLettre;
		this.date = new Date(o.date);
		this.dateTyped = new Date(o.dateSaisie);
		this.periodCode = o.codePeriode;

		this.subjectCode = o.codeMatiere;
		this.subjectName = o.libelleMatiere;
		this.subSubjectCode = o.codeSousMatiere || undefined;

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

	toJSON(): gradeJson {
		return {
			name: this.name,
			value: this.value,
			classMax: this.classMax,
			classAvg: this.classAvg,
			classMin: this.classMin,
			outOf: this.outOf,
			weight: this.weight,
			unweighted: this.unweighted,
			isLetter: this.isLetter,
			date: this.date,
			dateTyped: this.dateTyped,
			periodCode: this.periodCode,
			subjectCode: this.subjectCode,
			subjectName: this.subjectName,
			subSubjectCode: this.subSubjectCode,
			elements: this.elements,
			qcm: this.qcm,
			_raw: this._raw,
		};
	}
}

export interface gradeJson {
	name: string;
	value: number | string;

	classMax?: number | string;
	classAvg?: number | string;
	classMin?: number | string;

	outOf: number;
	weight: number;
	unweighted: boolean;
	isLetter: boolean;
	date: Date;
	dateTyped: Date;
	periodCode: string;

	subjectCode: string;
	subjectName: string;
	subSubjectCode?: string;

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
}

function betterValue(note: _grade): number | string {
	if (note.enLettre) return note.valeur;
	return +note.valeur.replace(/,/, ".");
}
