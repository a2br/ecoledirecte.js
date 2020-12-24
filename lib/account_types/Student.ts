import { htmlToText } from "html-to-text";

import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, studentAccount } from "../types";
import {
	getMainAccount,
	isStudentAccount,
	getTextbookPage,
	isFailure,
} from "../functions";

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
			throw Error("Family class's main account is wrong");

		if (!session.token) throw Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	async getHomework(date: string) {
		const textbook = await getTextbookPage(this.account.id, this.token, date);
		if (isFailure(textbook)) throw Error("API ERR; " + textbook);
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
