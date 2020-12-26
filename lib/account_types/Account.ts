import { Session } from "../Session";
import { account, isFailure } from "../types";
import { getMainAccount } from "../functions";

export class Account {
	private __account: account;
	private __token: string = "";

	get token() {
		return this.__token;
	}

	set token(value) {
		this.__token = value;
	}

	constructor(session: Session) {
		// Necessary checks
		if (!session.loginRes || isFailure(session.loginRes))
			throw new Error("Account class must have valid connection");

		const mainAccount = getMainAccount(session.loginRes.data.accounts);

		if (!session.token) throw new Error("Account class MUST have token");

		this.__account = mainAccount;
	}

	get _raw() {
		return this.__account;
	}
}
