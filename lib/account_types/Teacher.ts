import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, teacherAccount } from "../types";
import { getMainAccount, isTeacherAccount } from "../functions";

export class Teacher extends Account {
	public type: "teacher" = "teacher";
	private account: teacherAccount;
	private token: string;

	constructor(private session: Session) {
		super(session);
		const { username, password } = session.credentials;

		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isTeacherAccount(mainAccount))
			throw Error("Teacher class's main account is wrong");

		if (!session.token) throw Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}
}