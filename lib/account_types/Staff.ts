import { Account } from "./Account";
import { Session } from "../Session";

import { _loginResSuccess, staffAccount, isStaffAccount } from "../types";
import { getMainAccount } from "../functions";

export class Staff extends Account {
	public type: "staff" = "staff";
	private account: staffAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as _loginResSuccess).data.accounts
		);

		if (!isStaffAccount(mainAccount))
			throw new Error("Staff class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}
}
