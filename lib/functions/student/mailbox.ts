import fetch from "node-fetch";

import { _mailboxRes } from "../../types";

export async function getMessages(
	id: number,
	token: string,
	direction: "received" | "sent" = "received"
) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token: token,
		})
	);
	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/eleves/${id}/messages.awp?verbe=getall&typeRecuperation=${direction}&orderBy=date&order=desc&page=0&itemsPerPage=100&onlyRead=&query=&idClasseur=0`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _mailboxRes = await edRes.json();
	return body;
}
