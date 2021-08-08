import { Account } from "./Account";
import { Session } from "../Session";

import {
	loginResSuccess,
	teacherAccount,
	isTeacherAccount,
} from "ecoledirecte-api-types/v3";
import { getMainAccount, fetchPhoto } from "../util";

export class Teacher extends Account {
	public type: "teacher" = "teacher";
	private account: teacherAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as loginResSuccess).data.accounts
		);

		if (!isTeacherAccount(mainAccount))
			throw new Error("Teacher class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	private _photo?: Buffer;
	private _photoUri?: string;

	async getPhoto(): Promise<Buffer | undefined> {
		const r = await fetchPhoto(this);
		if (!r) return;
		const [buf, str] = r;
		this._photo = buf;
		this._photoUri = str;
		return buf;
	}

	get photo(): {
		buffer?: Buffer;
		uri?: string;
	} {
		return {
			buffer: this._photo,
			uri: this._photoUri,
		};
	}

	get _raw(): teacherAccount {
		return this.account;
	}
}
