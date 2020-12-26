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
	/**
	 * @async
	 * @returns EcoleDirecte login response
	 */
	public loginRes?: _loginRes;
	public token: string = "";

	constructor(username: string, password: string) {
		(this._username = username), (this._password = password);
	}

	async login() {
		const { _username: username, _password: password } = this;
		let loginRes = await login(username, password);

		this.loginRes = loginRes;
		this.token = loginRes.token;
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
}
