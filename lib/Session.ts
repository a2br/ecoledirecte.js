import {
	_loginRes,
	account,
	isFailure,
	isFamilyAccount,
	isStaffAccount,
	isStudentAccount,
	isTeacherAccount,
} from "./types";
import { getMainAccount, login } from "./functions";
import { Family, Staff, Student, Teacher } from "./account_types";
import { APIError } from "./errors";

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
		if (isFailure(loginRes)) throw new APIError(loginRes);

		// Login succeeded

		const account = getMainAccount(loginRes.data.accounts);
		if (isStudentAccount(account)) {
			return new Student(this);
		} else if (isFamilyAccount(account)) {
			return new Family(this);
		} else if (isTeacherAccount(account)) {
			return new Teacher(this);
		} else if (isStaffAccount(account)) {
			return new Staff(this);
		} else {
			throw new Error(`UNKNOWN ACCOUNT TYPE: '${(account as any).typeCompte}'`);
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
		return this.loginRes?.token;
	}

	set token(value) {
		if (!value || !this.loginRes) return;
		(this.loginRes.token as string) = value;
	}
}
