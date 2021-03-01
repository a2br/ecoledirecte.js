import { root, Routes, mailboxResSuccess } from "ecoledirecte-api-types/v3";

import { makeRequest } from "../util";
import { Message } from "../../classes";
import { Student } from "../../accounts";

export async function getMessages(
	id: number,
	token: string,
	direction: "received" | "sent" = "received",
	context: Record<string, unknown> = {}
): Promise<mailboxResSuccess> {
	const body: mailboxResSuccess = await makeRequest(
		{
			method: "POST",
			url: new URL(
				Routes.studentMailbox(id, { typeRecuperation: direction }),
				root
			).href,
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getMessages", ...context }
	);

	return body;
}

export function cleanMessages(
	mailboxRes: mailboxResSuccess,
	student: Student
): Message[] {
	const { received, sent } = mailboxRes.data.messages;
	const all = [...received, ...sent];
	const messages: Message[] = all
		.map(v => new Message(v, student))
		.sort((a, b) => a.id - b.id);

	return messages;
}
