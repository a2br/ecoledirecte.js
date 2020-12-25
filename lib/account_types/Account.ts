import { Session } from "../Session";
import { account } from "../types";
import { getMainAccount, isFailure } from "../functions";

export class Account {
	private __account: account;

	constructor(session: Session) {
		const { username, password } = session.credentials;

		// Necessary checks
		if (!session.loginRes || isFailure(session.loginRes))
			throw Error("Account class must have valid connection");

		const mainAccount = getMainAccount(session.loginRes.data.accounts);

		if (!session.token) throw Error("Account class MUST have token");

		this.__account = mainAccount;
	}

	get _raw() {
		return this.__account;
	}
	/**
	 * @deprecated In favor of `_raw`
	 */
	get doc() {
		return this._raw;
	}
}
