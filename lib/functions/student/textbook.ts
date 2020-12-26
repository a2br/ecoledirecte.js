import fetch from "node-fetch";
import { htmlToText } from "html-to-text";

import { _textbookRes, _textbookDateRes, isFailure } from "../../types";
import { _textbookDateAssignement, assignement } from "../../types";
import { APIError } from "../../errors";
import { expandBase64 } from "../util";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getUpcomingAssignementDates(id: number, token: string) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token,
		})
	);

	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte.awp?verbe=get`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _textbookRes = await edRes.json();
	if (isFailure(body)) throw new APIError(`${body.code} | ${body.message}`);

	const dates = Object.keys(body.data); // .map((date) => new Date(date));

	return dates;
}

/**
 * @param id Account id
 * @param token Auth token
 * @param date Date of the textbook page (YYYY-MM-DD)
 */
export async function getTextbookPage(id: number, token: string, date: string) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token,
		})
	);
	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte/${date}.awp?verbe=get`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _textbookDateRes = await edRes.json();
	return body;
}

export function cleanAssignements(data: {
	date: string;
	matieres: _textbookDateAssignement[];
}) {
	const assignements = data.matieres;
	const date = new Date(data.date); // Should not make any change
	const cleaned: assignement[] = assignements.map((v) => ({
		id: v.id,
		date: date,
		interro: v.interrogation,
		matiere: {
			nom: v.matiere,
			code: v.codeMatiere,
		},
		prof: v.nomProf.startsWith(" par ") ? v.nomProf.substr(5) : v.nomProf,
		aFaire: v.aFaire
			? {
					id: v.aFaire.idDevoir,
					contenu: expandBase64(v.aFaire.contenu),
					donneLe: new Date(v.aFaire.donneLe),
					rendreEnLigne: v.aFaire.rendreEnLigne,
					effectue: v.aFaire.effectue,
					dernierContenuDeSeance: {
						contenu: expandBase64(v.aFaire.contenuDeSeance.contenu),
						documents: v.aFaire.contenuDeSeance.documents,
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
	return cleaned;
}
