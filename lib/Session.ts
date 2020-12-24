import { _loginRes, account } from "./types";
import {
	getMainAccount,
	isStudentAccount,
	login,
	loginFailed,
	loginSucceeded,
} from "./functions";
import { Student } from "./Student";

export class Session {
	private _username: string;
	private _password: string;
	private _loggedIn: boolean = false;
	/**
	 * @async
	 * @returns EcoleDirecte login response
	 */
	public loginRes: _loginRes | null = null;

	constructor(username: string, password: string) {
		(this._username = username), (this._password = password);
	}

	async login() {
		this._loggedIn = true;

		const { _username: username, _password: password } = this;
		let loginRes = await login(username, password);

		this.loginRes = loginRes;
		if (loginFailed(loginRes))
			throw Error(`API ERR: ${loginRes.code} | ${loginRes.message}`);
		// Login succeeded
		const account = getMainAccount(loginRes.data.accounts);
		if (isStudentAccount(account)) {
			return new Student(this);
		} else {
			throw Error(`ACCOUNTS OF TYPE '${account.typeCompte}' ARE NOT SUPPORTED`);
		}
	}

	/**
	 * @returns Given credentials
	 */
	get credentials() {
		return { username: this._username, password: this._password };
	}

	/**
	 * @async
	 * @returns EcoleDirecte auth token
	 */
	get token() {
		return this.loginRes?.token || null;
	}
}
