import { Account } from "./Account";
import { Session } from "../Session";

import {
	loginResSuccess,
	studentAccount,
	isStudentAccount,
} from "ecoledirecte-api-types/v3";
import {
	getMainAccount,
	getMessages,
	getTextbookPage,
	toISODate,
	getGrades,
	getTimeline,
	fetchPhoto,
} from "../functions";
import { TimelineElem } from "../classes";
import { Message, Grade, Period, Assignement } from "../classes";

import { getUpcomingAssignementDates } from "../functions/student/textbook";
import { cleanMessages } from "../functions/student/mailbox";

export class Student extends Account {
	public type: "student" = "student";
	private account: studentAccount;

	constructor(private session: Session) {
		super(session);
		const mainAccount = getMainAccount(
			(session.loginRes as loginResSuccess).data.accounts
		);

		if (!isStudentAccount(mainAccount))
			throw new Error("Family class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	/**
	 * Fetches the homework
	 * @param dates (Array of) variable(s) which can be converted into Date object(s). Preffered type: "YYYY-MM-DD"
	 * @param onlyWithWork If true, will ignore all assignements objects that do not contain any homework
	 */
	async getHomework(
		params: {
			dates?: Array<Date | string | number> | (Date | string | number);
			onlyWithWork?: boolean;
		} = {},
		context: Record<string, unknown> = {}
	): Promise<Assignement[]> {
		let { dates } = params;
		const { onlyWithWork } = params;
		if (!dates) {
			const upcomingAssignementDates = await getUpcomingAssignementDates(
				this.account.id,
				this.token,
				context
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
						d,
						context
					);
					this.token = textbook.token;

					const homework = textbook.data;
					const cleaned = homework.matieres.map(
						s => new Assignement(s, homework.date, this)
					);
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
	async getMessages(context: Record<string, unknown> = {}): Promise<Message[]> {
		const received = await getMessages(
			this.account.id,
			this.token,
			"received",
			context
		);
		this.token = received.token;
		const sent = await getMessages(
			this.account.id,
			this.token,
			"sent",
			context
		);
		this.token = sent.token;
		const messages = received;
		messages.data.messages.sent = sent.data.messages.sent;
		const cleaned = cleanMessages(messages, this);

		return cleaned;
	}

	/**
	 * @returns Every grade
	 */
	async getGrades(context: Record<string, unknown> = {}): Promise<Grade[]> {
		const _grades = await getGrades(this.account.id, this.token, context);
		this.token = _grades.token;
		const grades = _grades.data.notes.map(g => new Grade(g));
		return grades;
	}

	/**
	 * @returns Every periods with their subjects. Useful to get more infos about grades.
	 * It is recommended to cache them.
	 */
	async getPeriods(context: Record<string, unknown> = {}): Promise<Period[]> {
		const _grades = await getGrades(this.account.id, this.token, context);
		this.token = _grades.token;
		const periods = _grades.data.periodes.map(p => new Period(p));
		return periods;
	}

	/**
	 * @returns The equivalent of `getGrades` and `getPeriods`, with only 1 request
	 */
	async getGradesAndPeriods(
		context: Record<string, unknown> = {}
	): Promise<{ grades: Grade[]; periods: Period[] }> {
		const _all = await getGrades(this.account.id, this.token, context);
		this.token = _all.token;
		const grades = _all.data.notes.map(g => new Grade(g));
		const periods = _all.data.periodes.map(p => new Period(p));
		return { grades, periods };
	}

	async timeline(
		context: Record<string, unknown> = {}
	): Promise<TimelineElem[]> {
		const _timeline = await getTimeline(this.account.id, this.token, context);
		this.token = _timeline.token;
		const tlElems: TimelineElem[] = _timeline.data
			? _timeline.data.map(e => new TimelineElem(e))
			: [];
		return tlElems;
	}

	private _photo?: Buffer;
	private _photoUri?: string;

	async getPhoto(): Promise<Buffer | undefined> {
		const r = await fetchPhoto(this._raw);
		if (!r) return;
		const [buf, str] = r;
		this._photo = buf;
		this._photoUri = str;
		return buf;
	}

	get photo(): {
		buffer?: Buffer;
		uri?: string;
	} {
		return {
			buffer: this._photo,
			uri: this._photoUri,
		};
	}

	get _raw(): studentAccount {
		return this.account;
	}
}
