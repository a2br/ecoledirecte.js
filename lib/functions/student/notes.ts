import {
	root,
	Routes,
	note as _grade,
	periode as _period,
} from "ecoledirecte-api-types";
import { _notesResSuccess, grade, period } from "../../types";
import { expandBase64, makeRequest } from "../util";

function betterValue(note: _grade): number | string {
	if (note.enLettre) return note.valeur;
	return +note.valeur.replace(/,/, ".");
}

export async function getGrades(
	id: number,
	token: string
): Promise<_notesResSuccess> {
	const body: _notesResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentGrades(id), root).href,
		body: { token },
		guard: true,
	});

	return body;
}

export function cleanGrades(_grades: _grade[]): grade[] {
	const grades: grade[] = _grades.map(v => ({
		name: v.devoir,
		value: betterValue(v),
		class:
			v.moyenneClasse && v.maxClasse && v.minClasse
				? {
						max: v.maxClasse,
						avg: v.moyenneClasse,
						min: v.minClasse,
				  }
				: undefined,
		denominator: +v.noteSur.replace(/,/, "."),
		weight: +v.coef,
		uncounted: v.nonSignificatif,
		isLetter: v.enLettre,
		date: new Date(v.date),
		dateTyped: new Date(v.dateSaisie),
		periodCode: v.codePeriode,
		subject: {
			code: v.codeMatiere,
			name: v.libelleMatiere,
			minor: v.codeSousMatiere,
		},
		elements: v.elementsProgramme.map(e => ({
			id: e.idElemProg,
			competenceId: e.idCompetence,
			name: e.libelleCompetence,
			description: e.descriptif,
			value: e.valeur,
		})),
		qcm: v.qcm
			? {
					id: v.qcm.idQCM,
					name: v.qcm.titre,
					startsAt: new Date(v.qcm.debute),
			  }
			: undefined,
		_raw: v,
	}));
	return grades;
}

export function cleanPeriods(_periods: _period[]): period[] {
	const periods: period[] = _periods.map(v => ({
		id: v.idPeriode,
		name: v.periode,
		yearly: v.annuel,
		closed: v.cloture,
		start: new Date(v.dateDebut),
		end: new Date(v.dateFin),
		mockExam: v.examenBlanc,
		headcount: v.ensembleMatieres.effectif
			? +v.ensembleMatieres.effectif
			: undefined,
		rank: v.ensembleMatieres.rang ? +v.ensembleMatieres.rang : undefined,
		headTeacher: v.ensembleMatieres.nomPP,
		appraisals:
			v.ensembleMatieres.appreciationCE ||
			v.ensembleMatieres.appreciationPP ||
			v.ensembleMatieres.appreciationVS
				? {
						CE: v.ensembleMatieres.appreciationCE,
						PP: v.ensembleMatieres.appreciationPP,
						VS: v.ensembleMatieres.appreciationVS,
				  }
				: undefined,
		class:
			v.ensembleMatieres.appreciationGeneraleClasse ||
			v.ensembleMatieres.moyenneClasse
				? {
						appraisal: v.ensembleMatieres.appreciationGeneraleClasse,
						averageGrade: v.ensembleMatieres.moyenneClasse
							? +v.ensembleMatieres.moyenneClasse.replace(/,/, ".")
							: undefined,
				  }
				: undefined,
		council:
			v.dateConseil ||
			v.heureConseil ||
			v.heureFinConseil ||
			v.salleConseil ||
			v.ensembleMatieres.decisionDuConseil
				? {
						start: v.dateConseil
							? new Date(v.dateConseil + " " + (v.heureConseil || ""))
							: undefined,
						end:
							v.dateConseil && v.heureFinConseil
								? new Date(v.dateConseil + " " + v.heureFinConseil)
								: undefined,
						room: v.salleConseil,
						verdict: v.ensembleMatieres.decisionDuConseil,
				  }
				: undefined,
		calcDate: v.ensembleMatieres.dateCalcul
			? new Date(v.ensembleMatieres.dateCalcul)
			: undefined,
		subjects: v.ensembleMatieres.disciplines.map(d => ({
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
			class:
				d.appreciationClasse || d.moyenneClasse || d.moyenneMax || d.moyenneMin
					? {
							appraisal: d.appreciationClasse
								? expandBase64(d.appreciationClasse)
								: undefined,
							max: d.moyenneMax ? +d.moyenneMax.replace(/,/, ".") : undefined,
							avg: d.moyenneClasse
								? +d.moyenneClasse.replace(/,/, ".")
								: undefined,
							min: d.moyenneMin ? +d.moyenneMin.replace(/,/, ".") : undefined,
					  }
					: undefined,
		})),
		_raw: v,
	}));
	return periods;
}
