import { Account } from "./Account";
import { Session } from "../Session";

import {
	_loginResSuccess,
	studentAccount,
	isStudentAccount,
	assignement,
	message,
} from "../types";
import {
	cleanAssignements,
	getMainAccount,
	getMessages,
	getTextbookPage,
	toISODate,
} from "../functions";
import { getUpcomingAssignementDates } from "../functions/student/textbook";
import { cleanMessages } from "../functions/student/mailbox";

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

	/**
	 * Fetches the homework
	 * @param dates (Array of) variable(s) which can be converted into Date object(s)
	 * @param onlyWithWork If true, will ignore all assignements objects that do not contain any homework
	 */
	async getHomework(
		params: {
			dates?: Array<Date | string | number> | (Date | string | number);
			onlyWithWork?: boolean;
		} = {}
	): Promise<assignement[]> {
		let { dates } = params;
		const { onlyWithWork } = params;
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
				dates.map(async date => {
					const d = toISODate(date);
					const textbook = await getTextbookPage(
						this.account.id,
						this.token,
						d
					);
					this.token = textbook.token;

					const homework = textbook.data;
					const cleaned = cleanAssignements(homework, this);
					if (onlyWithWork) return cleaned.filter(v => !!("job" in v));
					return cleaned;
				})
			)
		)
			.flat()
			.sort((a, b) => a.date.getTime() - b.date.getTime());
		return resultsArray;
	}

	/**
	 * @returns Every sent and received message, in ascending order by id
	 */
	async getMessages(): Promise<message[]> {
		const received = await getMessages(this.account.id, this.token, "received");
		const sent = await getMessages(this.account.id, this.token, "sent");

		const messages = received;
		messages.data.messages.sent = sent.data.messages.sent;
		const cleaned = cleanMessages(messages, this);

		return cleaned;
	}
}
