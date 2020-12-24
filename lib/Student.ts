import { Session } from "./Session";
import { studentAccount } from "./types";
import {
	getMainAccount,
	isStudentAccount,
	loginFailed,
	getTextbookPage,
	textbookDateFailed,
} from "./functions";

export class Student {
	private account: studentAccount;
	private token: string;
	constructor(private session: Session) {
		const { username, password } = session.credentials;

		// Necessary checks
		if (!session.loginRes || loginFailed(session.loginRes))
			throw Error("Student class must have valid connection");
		const mainAccount = getMainAccount(session.loginRes.data.accounts);
		if (!isStudentAccount(mainAccount))
			throw Error("Student class's main account MUST be of type 'E'");
		if (!session.token) throw Error("Student class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	async getHomework(date: string) {
		const textbook = await getTextbookPage(this.account.id, this.token, date);
		if (textbookDateFailed(textbook)) throw Error("API ERR; " + textbook);
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
				contenu: Buffer.from(v.contenuDeSeance.contenu, "base64").toString(),
				documents: v.contenuDeSeance.documents,
			},
			_raw: v,
		}));
	}
}
