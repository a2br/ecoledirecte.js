import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, studentAccount, isStudentAccount } from "../types";
import {
	cleanAssignements,
	getMainAccount,
	getMessages,
	getTextbookPage,
	toISODate,
} from "../functions";
import { getUpcomingAssignementDates } from "../functions/student/textbook";

export class Student extends Account {
	public type: "student" = "student";
	private account: studentAccount;

	constructor(private session: Session) {
		super(session);
		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isStudentAccount(mainAccount))
			throw new Error("Family class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	async getHomework(
		dates: Array<Date | string | number> | (Date | string | number)
	) {
		if (!dates) {
			const upcomingAssignementDates = await getUpcomingAssignementDates(
				this.account.id,
				this.token
			);
			dates = upcomingAssignementDates.dates;
			this.token = upcomingAssignementDates.token;
		}

		if (!Array.isArray(dates)) dates = [dates];

		const resultsArray = (
			await Promise.all(
				dates.map(async (date) => {
					const d = toISODate(date);
					const textbook = await getTextbookPage(
						this.account.id,
						this.token,
						d
					);
					this.token = textbook.token;

					const homework = textbook.data;
					const cleanedAndToken = cleanAssignements(homework, this.token);
					const { cleaned } = cleanedAndToken;
					this.token = cleanedAndToken.token;
					const withWork = cleaned.filter((v) => !!("aFaire" in v));
					return withWork;
				})
			)
		)
			.flat()
			.sort((a, b) => a.date.getTime() - b.date.getTime());
		return resultsArray;
	}

	async getMessages(direction: "received" | "sent" = "received") {
		const messages = await getMessages(this.account.id, this.token, "received");
		return messages;
	}
}
