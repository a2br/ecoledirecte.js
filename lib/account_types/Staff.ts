import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, staffAccount } from "../types";
import { getMainAccount, isStaffAccount } from "../functions";

export class Staff extends Account {
	public type: "staff" = "staff";
	private account: staffAccount;
	private token: string;

	constructor(private session: Session) {
		super(session);
		const { username, password } = session.credentials;

		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isStaffAccount(mainAccount))
			throw Error("Staff class's main account is wrong");

		if (!session.token) throw Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}
}
