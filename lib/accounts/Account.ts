import { Session } from "../Session";
import { account, isFailure } from "ecoledirecte-api-types/v3";
import { getMainAccount } from "../util";

export class Account {
	private __session: Session;
	private __account: account;

	get token(): string {
		return this.__session.token;
	}

	set token(value: string) {
		this.__session.token = value;
	}

	get credentials(): { username: string; password: string } {
		return this.__session.credentials;
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

	/**
	 * @description EcoleDirecte unique Id
	 */
	get edId(): number {
		return this.__account.id;
	}

	/**
	 * @description Equivalent of _raw, but the type changes
	 */
	get __raw(): account {
		return this.__account;
	}
}
