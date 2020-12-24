import { _loginRes } from "./types";
import { login } from "./functions";

export class Session {
	private _username: string;
	private _password: string;
	private _token: Promise<string>;

	/**
	 * @async
	 * @returns EcoleDirecte login response
	 */
	public loginRes: Promise<_loginRes>;

	constructor(username: string, password: string) {
		(this._username = username), (this._password = password);
		let loginRes = login(username, password);
		this.loginRes = loginRes;
		this._token = new Promise(async (resolve) => {
			resolve((await loginRes).token);
		});
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
		return this._token;
	}
}
