import { makeRequest } from "../util";

import { _mailboxRes } from "../../types";
import { _mailboxResSuccess } from "../../types/student/mailbox";

export async function getMessages(
	id: number,
	token: string,
	direction: "received" | "sent" = "received"
) {
	const body: _mailboxResSuccess = await makeRequest({
		method: "POST",
		url: `https://api.ecoledirecte.com/v3/eleves/${id}/messages.awp?verbe=getall&typeRecuperation=${direction}&orderBy=date&order=desc&page=0&itemsPerPage=100&onlyRead=&query=&idClasseur=0`,
		body: { token },
		guard: true,
	});

	return body;
}

export function cleanMessages(mailboxRes: _mailboxResSuccess, token: string) {}
