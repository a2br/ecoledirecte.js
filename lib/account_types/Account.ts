import { Session } from "../Session";
import { account, isFailure } from "../types";
import { getMainAccount } from "../functions";

export class Account {
	private __session: Session;
	private __account: account;

	get token(): string {
		return this.__session.token;
	}

	set token(value: string) {
		this.__session.token = value;
	}

	constructor(session: Session) {
		this.__session = session;
		// Necessary checks
		if (!session.loginRes || isFailure(session.loginRes))
			throw new Error("Account class must have valid connection");

		const mainAccount = getMainAccount(session.loginRes.data.accounts);

		if (!session.token) throw new Error("Account class MUST have token");

		this.__account = mainAccount;
	}
}
