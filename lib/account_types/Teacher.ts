import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, teacherAccount, isTeacherAccount } from "../types";
import { getMainAccount } from "../functions";

export class Teacher extends Account {
	public type: "teacher" = "teacher";
	private account: teacherAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isTeacherAccount(mainAccount))
			throw new Error("Teacher class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	get _raw(): teacherAccount {
		return this.account;
	}
}
