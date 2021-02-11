import { periode as _period } from "ecoledirecte-api-types";
import { expandBase64 } from "../functions/util";
import { expandedBase64 } from "../types/util";

export class Period {
	readonly id: string;
	readonly name: string;
	readonly yearly: boolean;
	readonly closed: boolean;
	readonly start: Date;
	readonly end: Date;
	readonly mockExam: boolean;
	readonly headcount?: number;
	readonly rank?: number;
	readonly headTeacher?: string;
	readonly appraisals: {
		CE?: string;
		PP?: string;
		VS?: string;
	};
	readonly class: {
		appraisal?: string;
		averageGrade?: number;
	};
	readonly council: {
		start?: Date;
		end?: Date;
		room?: string;
		verdict?: string;
	};
	readonly calcDate?: Date;
	readonly subjects: Array<subject>;
	readonly _raw: _period;

	constructor(o: _period) {
		this.id = o.idPeriode;
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
		this.subjects = o.ensembleMatieres.disciplines.map(d => ({
			id: d.id,
			code: d.codeMatiere,
			name: d.discipline,
			weight: d.coef,
			headcount: d.effectif,
			rank: d.rang,
			minor: d.sousMatiere,
			minorCode: d.codeSousMatiere || undefined,
			group: d.groupeMatiere,
			groupId: d.idGroupeMatiere,
			appraisals: d.appreciations
				? d.appreciations.filter(a => !!a).map(a => expandBase64(a))
				: [],
			option: d.option,
			teachers: d.professeurs.map(p => ({
				id: p.id,
				name: p.nom,
			})),
			class: {
				appraisal: d.appreciationClasse
					? expandBase64(d.appreciationClasse)
					: undefined,
				max: d.moyenneMax ? +d.moyenneMax.replace(/,/, ".") : undefined,
				avg: d.moyenneClasse ? +d.moyenneClasse.replace(/,/, ".") : undefined,
				min: d.moyenneMin ? +d.moyenneMin.replace(/,/, ".") : undefined,
			},
			_raw: o,
		}));
		this._raw = o;
	}
}

type subject = {
	id: number;
	code: string;
	name: string;
	weight: number;
	headcount: number;
	rank: number;
	minor: boolean;
	minorCode?: string;
	group: boolean;
	groupId: number;
	appraisals: Array<expandedBase64>;
	option: number;
	teachers: Array<{
		id: number;
		name: string;
	}>;
	class: {
		appraisal?: expandedBase64;
		max?: number;
		avg?: number;
		min?: number;
	};
};
