import { Account } from "./Account";
import { Session } from "../Session";

import {
	loginResSuccess,
	staffAccount,
	isStaffAccount,
} from "ecoledirecte-api-types/v3";
import { getMainAccount, fetchPhoto } from "../functions";

export class Staff extends Account {
	public type: "staff" = "staff";
	private account: staffAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as loginResSuccess).data.accounts
		);

		if (!isStaffAccount(mainAccount))
			throw new Error("Staff class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}

	private _photo?: Buffer;
	private _photoUri?: string;

	async getPhoto(): Promise<Buffer | undefined> {
		const r = await fetchPhoto(this._raw);
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

	get _raw(): staffAccount {
		return this.account;
	}
}
