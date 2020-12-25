import fetch from "node-fetch";

import { _textbookRes, _textbookDateRes } from "../../types";

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
