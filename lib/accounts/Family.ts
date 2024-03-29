import { Account } from "./Account";
import { Session } from "../Session";

import {
	loginResSuccess,
	familyAccount,
	isFamilyAccount,
} from "ecoledirecte-api-types/v3";
import { getMainAccount } from "../util";

export class Family extends Account {
	public type: "family" = "family";
	private account: familyAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as loginResSuccess).data.accounts
		);

		if (!isFamilyAccount(mainAccount))
			throw new Error("Family class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	get _raw(): familyAccount {
		return this.account;
	}
}
