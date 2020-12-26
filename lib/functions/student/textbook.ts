import fetch from "node-fetch";
import { htmlToText } from "html-to-text";

import { _textbookRes, _textbookDateRes } from "../../types";
import { _textbookDateAssignement, assignement } from "../../types";
import { toISODate } from "../util";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getTextbook(id: number, token: string) {
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
	return body;
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
	const date = toISODate(data.date); // Should not make any change
	const cleaned: assignement[] = assignements.map((v) => ({
		id: v.id,
		date: date,
		interro: v.interrogation,
		matiere: {
			nom: v.matiere,
			code: v.codeMatiere,
		},
		prof: v.nomProf.startsWith(" par ") ? v.nomProf.substr(5) : v.nomProf,
		contenuDeSeance: {
			idDevoir: v.contenuDeSeance.idDevoir,
			contenu: {
				original: v.contenuDeSeance.contenu,
				html: Buffer.from(v.contenuDeSeance.contenu, "base64").toString(),
				text: htmlToText(
					Buffer.from(v.contenuDeSeance.contenu, "base64").toString(),
					{
						wordwrap: false,
					}
				),
			},
			documents: v.contenuDeSeance.documents,
		},
		_raw: v,
	}));
	return cleaned;
}
