import { htmlToText } from "html-to-text";

import { Account } from "./Account";
import { Session } from "../Session";

import {
	_loginResSuccess,
	studentAccount,
	isStudentAccount,
	isFailure,
} from "../types";
import { getMainAccount, getTextbookPage, toISODate } from "../functions";
import { APIError } from "../errors";

export class Student extends Account {
	public type: "student" = "student";
	private account: studentAccount;
	private token: string;

	constructor(private session: Session) {
		super(session);
		const { username, password } = session.credentials;

		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isStudentAccount(mainAccount))
			throw new Error("Family class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	async getHomework(date: Date | string | string) {
		const d = toISODate(date);

		const textbook = await getTextbookPage(this.account.id, this.token, d);
		if (isFailure(textbook))
			throw new APIError(`${textbook.code} | ${textbook.message}`);
		const homework = textbook.data.matieres;
		return homework.map((v) => ({
			id: v.id,
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
	}

	async getMessages(direction: "received" | "sent" = "received") {}
}
