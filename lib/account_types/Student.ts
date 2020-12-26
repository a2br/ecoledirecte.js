import { htmlToText } from "html-to-text";

import { Account } from "./Account";
import { Session } from "../Session";

import {
	_loginResSuccess,
	studentAccount,
	isStudentAccount,
	isFailure,
} from "../types";
import {
	cleanAssignements,
	getMainAccount,
	getTextbookPage,
	toISODate,
} from "../functions";
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

		const homework = textbook.data;
		const cleaned = cleanAssignements(homework);
		return cleaned;
	}

	async getMessages(direction: "received" | "sent" = "received") {}
}
