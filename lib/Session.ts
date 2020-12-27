import { _loginRes, isFailure } from "./types";
import {
	isFamilyAccount,
	isStaffAccount,
	isStudentAccount,
	isTeacherAccount,
} from "./types";
import { getMainAccount, login } from "./functions";
import { Family, Staff, Student, Teacher } from "./account_types";
import { EcoleDirecteAPIError } from "./errors";

export class Session {
	private _username: string;
	private _password: string;
	/**
	 * @async
	 * @returns EcoleDirecte login response
	 */
	public loginRes?: _loginRes;
	public token = "";

	constructor(username: string, password: string) {
		(this._username = username), (this._password = password);
	}

	async login(): Promise<Family | Staff | Student | Teacher> {
		const { _username: username, _password: password } = this;
		const loginRes = await login(username, password);

		this.loginRes = loginRes;
		this.token = loginRes.token;
		if (isFailure(loginRes)) throw new EcoleDirecteAPIError(loginRes);

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
