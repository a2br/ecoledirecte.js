import { expandBase64, makeRequest } from "../util";

import { _mailboxRes, message } from "../../types";
import {
	_mailboxResSuccess,
	_messageResSuccess,
} from "../../types/student/mailbox";
import { Student } from "../../account_types";

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

export function cleanMessages(
	mailboxRes: _mailboxResSuccess,
	student: Student
) {
	const { received, sent } = mailboxRes.data.messages;
	const all = [...received, ...sent];
	const messages: message[] = all.map((v) => {
		return {
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
					url: `https://api.ecoledirecte.com/v3/eleves/${
						student._raw.id
					}/messages/${this.id}.awp?verbe=get&mode=${
						this.type === "received" ? "destinataire" : "expediteur"
					}`,
					body: { token: student.token },
					guard: true,
				});
				return expandBase64(details.data.content);
			},
			date: new Date(v.date),
			to: v.to.map((r) => ({
				id: r.id,
				name: r.name,
				nom: r.nom,
				prenom: r.prenom,
				particule: r.particule,
				civilite: r.civilite,
				role: r.role,
				read: r.read,
				to_cc_cci: r.to_cc_cci,
			})),
			from: {
				id: v.from.id,
				name: v.from.name,
				nom: v.from.nom,
				prenom: v.from.prenom,
				particule: v.from.particule,
				civilite: v.from.civilite,
				role: v.from.role,
				read: v.from.read,
			},
			_raw: v,
		};
	});

	return all;
}
