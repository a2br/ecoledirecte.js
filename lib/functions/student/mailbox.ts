import { root, Routes } from "ecoledirecte-api-types";

import { expandBase64, makeRequest } from "../util";
import { message } from "../../types";
import {
	_mailboxResSuccess,
	_messageResSuccess,
} from "../../types/student/mailbox";
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
): message[] {
	const { received, sent } = mailboxRes.data.messages;
	const all = [...received, ...sent];
	const messages: message[] = all
		.map(v => ({
			id: v.id,
			type: v.mtype,
			read: v.read,
			transferred: v.transferred,
			answered: v.answered,
			to_cc_cci: v.to_cc_cci,
			subject: v.subject,
			getContent: async function () {
				const details: _messageResSuccess = await makeRequest({
					method: "POST",
					url: new URL(
						Routes.studentMessage(student._raw.id, this.id, {
							mode: this.type === "received" ? "destinataire" : "expediteur",
						}),
						root
					).href,
					body: { token: student.token },
					guard: true,
				});
				return expandBase64(details.data.content);
			},
			date: new Date(v.date),
			to: v.to.map(r => ({
				id: r.id,
				fullName: r.name,
				lastName: r.nom,
				firstName: r.prenom,
				particle: r.particule,
				civility: r.civilite,
				role: r.role,
				read: r.read,
				to_cc_cci: r.to_cc_cci,
			})),
			from: {
				id: v.from.id,
				fullName: v.from.name,
				lastName: v.from.nom,
				firstName: v.from.prenom,
				particle: v.from.particule,
				civility: v.from.civilite,
				role: v.from.role,
				read: v.from.read,
			},
			_raw: v,
		}))
		.sort((a, b) => a.id - b.id);

	return messages;
}
