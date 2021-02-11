import { root, Routes } from "ecoledirecte-api-types";

import { makeRequest } from "../util";
import { Message } from "../../classes/Mail";
import { _mailboxResSuccess } from "../../types/student/mailbox";
import { Student } from "../../accounts";

export async function getMessages(
	id: number,
	token: string,
	direction: "received" | "sent" = "received"
): Promise<_mailboxResSuccess> {
	const body: _mailboxResSuccess = await makeRequest({
		method: "POST",
		url: new URL(
			Routes.studentMailbox(id, { typeRecuperation: direction }),
			root
		).href,
		body: { token },
		guard: true,
	});

	return body;
}

export function cleanMessages(
	mailboxRes: _mailboxResSuccess,
	student: Student
): Message[] {
	const { received, sent } = mailboxRes.data.messages;
	const all = [...received, ...sent];
	const messages: Message[] = all
		.map(v => new Message(v, student))
		.sort((a, b) => a.id - b.id);

	return messages;
}
