import { loginRes, isFailure } from "ecoledirecte-api-types/v3";
import { getMainAccount, login } from "./functions";
import { Family, Staff, Student, Teacher } from "./accounts";
import { EcoleDirecteAPIError } from "./errors";
import logs from "./events";

//TODO Make settings
// Needs to be global object
export interface SessionSettings {
	/**
	 * @example "https://api.ecoledirecte.com"
	 */
	root?: string;
}

export class Session {
	private _username: string;
	private _password: string;
	/**
	 * @async
	 * @returns EcoleDirecte login response
	 */
	public loginRes?: loginRes;
	private _token = "";

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		logs.emit("newToken", {
			oldToken: this._token,
			newToken: value,
			session: this,
		});
		this._token = value;
	}

	constructor(
		username: string,
		password: string,
		public _settings?: SessionSettings
	) {
		(this._username = username), (this._password = password);
	}

	async login(
		context: Record<string, unknown> = {}
	): Promise<Family | Staff | Student | Teacher> {
		const { _username: username, _password: password } = this;
		const loginRes = await login(username, password, context);

		this.loginRes = loginRes;
		this.token = loginRes.token;
		if (isFailure(loginRes)) throw new EcoleDirecteAPIError(loginRes);

		// Login succeeded

		const account = getMainAccount(loginRes.data.accounts);
		switch (account.typeCompte) {
			case "E":
				return new Student(this);
			case "1":
				return new Family(this);
			case "P":
				return new Teacher(this);
			case "A":
				return new Staff(this);
			default:
				throw new Error(
					`UNKNOWN ACCOUNT TYPE: '${
						(account as { typeCompte: string }).typeCompte
					}'`
				);
		}
	}

	/**
	 * @returns Given credentials
	 */
	get credentials(): { username: string; password: string } {
		const credentials = { username: this._username, password: this._password };
		return credentials;
	}
}
