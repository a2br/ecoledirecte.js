import {
	subject as _subject,
	period as _period,
} from "ecoledirecte-api-types/v3";
import { ExpandedBase64, expandedBase64Json } from "../classes";

export class Period {
	code: string;
	name: string;
	yearly: boolean;
	closed: boolean;
	start: Date;
	end: Date;
	mockExam: boolean;
	headcount?: number;
	rank?: number;
	headTeacher?: string;
	appraisals: {
		CE?: string;
		PP?: string;
		VS?: string;
	};
	class: {
		appraisal?: string;
		averageGrade?: number;
	};
	council: {
		start?: Date;
		end?: Date;
		room?: string;
		verdict?: string;
	};
	calcDate?: Date;
	subjects: Array<Subject>;
	_raw: _period;

	constructor(o: _period) {
		this.code = o.idPeriode;
		this.name = o.periode;
		this.yearly = o.annuel;
		this.closed = o.cloture;
		this.start = new Date(o.dateDebut);
		this.end = new Date(o.dateFin);
		this.mockExam = o.examenBlanc;
		this.headcount = o.ensembleMatieres.effectif
			? +o.ensembleMatieres.effectif
			: undefined;
		this.rank = o.ensembleMatieres.rang ? +o.ensembleMatieres.rang : undefined;
		this.headTeacher = o.ensembleMatieres.nomPP;
		this.appraisals = {
			CE: o.ensembleMatieres.appreciationCE,
			PP: o.ensembleMatieres.appreciationPP,
			VS: o.ensembleMatieres.appreciationVS,
		};
		this.class = {
			appraisal: o.ensembleMatieres.appreciationGeneraleClasse,
			averageGrade: o.ensembleMatieres.moyenneClasse
				? +o.ensembleMatieres.moyenneClasse.replace(/,/, ".")
				: undefined,
		};
		this.council = {
			start: o.dateConseil
				? new Date(o.dateConseil + " " + (o.heureConseil || ""))
				: undefined,
			end:
				o.dateConseil && o.heureFinConseil
					? new Date(o.dateConseil + " " + o.heureFinConseil)
					: undefined,
			room: o.salleConseil,
			verdict: o.ensembleMatieres.decisionDuConseil || undefined,
		};
		this.calcDate = o.ensembleMatieres.dateCalcul
			? new Date(o.ensembleMatieres.dateCalcul)
			: undefined;
		this.subjects = o.ensembleMatieres.disciplines.map(d => new Subject(d));
		this._raw = o;
	}

	toJSON(): periodJson {
		return {
			code: this.code,
			name: this.name,
			yearly: this.yearly,
			closed: this.closed,
			start: this.start,
			end: this.end,
			mockExam: this.mockExam,
			headcount: this.headcount,
			rank: this.rank,
			headTeacher: this.headTeacher,
			appraisals: this.appraisals,
			class: this.class,
			council: this.council,
			calcDate: this.calcDate,
			subjects: this.subjects.map(s => s.toJSON()),
			_raw: this._raw,
		};
	}
}

export interface periodJson {
	code: string;
	name: string;
	yearly: boolean;
	closed: boolean;
	start: Date;
	end: Date;
	mockExam: boolean;
	headcount?: number;
	rank?: number;
	headTeacher?: string;
	appraisals: {
		CE?: string;
		PP?: string;
		VS?: string;
	};
	class: {
		appraisal?: string;
		averageGrade?: number;
	};
	council: {
		start?: Date;
		end?: Date;
		room?: string;
		verdict?: string;
	};
	calcDate?: Date;
	subjects: Array<subjectJson>;
	_raw: _period;
}

export class Subject {
	id: number;
	code: string;
	name: string;
	weight: number;
	headcount: number;
	rank: number;
	minorSubject: boolean;
	minorSubjectCode?: string;
	group: boolean;
	groupId: number;
	appraisals: Array<ExpandedBase64>;
	option: number;
	teachers: Array<{
		id: number;
		name: string;
	}>;
	class: {
		appraisal?: ExpandedBase64;
		max?: number;
		avg?: number;
		min?: number;
	};
	_raw: _subject;

	constructor(o: _subject) {
		this.id = o.id;
		this.code = o.codeMatiere;
		this.name = o.discipline;
		this.weight = o.coef;
		this.headcount = o.effectif;
		this.rank = o.rang;
		this.minorSubject = o.sousMatiere;
		this.minorSubjectCode = o.codeSousMatiere || undefined;
		this.group = o.groupeMatiere;
		this.groupId = o.idGroupeMatiere;
		this.appraisals = o.appreciations
			? o.appreciations.filter(a => !!a).map(a => new ExpandedBase64(a))
			: [];
		this.option = o.option;
		this.teachers = o.professeurs.map(p => ({
			id: p.id,
			name: p.nom,
		}));
		this.class = {
			appraisal: o.appreciationClasse
				? new ExpandedBase64(o.appreciationClasse)
				: undefined,
			max: o.moyenneMax ? +o.moyenneMax.replace(/,/, ".") : undefined,
			avg: o.moyenneClasse ? +o.moyenneClasse.replace(/,/, ".") : undefined,
			min: o.moyenneMin ? +o.moyenneMin.replace(/,/, ".") : undefined,
		};
		this._raw = o;
	}

	toJSON(): subjectJson {
		const toReturn = {
			id: this.id,
			code: this.code,
			name: this.name,
			weight: this.weight,
			headcount: this.headcount,
			rank: this.rank,
			minorSubject: this.minorSubject,
			minorSubjectCode: this.minorSubjectCode,
			group: this.group,
			groupId: this.groupId,
			appraisals: this.appraisals.map(a => a.toJSON()),
			option: this.option,
			teachers: this.teachers,
			class: {
				appraisal: this.class.appraisal?.toJSON(),
				max: this.class.max,
				avg: this.class.avg,
				min: this.class.min,
			},
			_raw: this._raw,
		};
		return toReturn;
	}
}

// export interface periodJson {

// }

export interface subjectJson {
	id: number;
	code: string;
	name: string;
	weight: number;
	headcount: number;
	rank: number;
	minorSubject: boolean;
	minorSubjectCode?: string;
	group: boolean;
	groupId: number;
	appraisals: expandedBase64Json[];
	option: number;
	teachers: { id: number; name: string }[];
	class: {
		appraisal?: expandedBase64Json;
		max?: number;
		avg?: number;
		min?: number;
	};
	_raw: _subject;
}
