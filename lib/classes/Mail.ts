import {
	role,
	mailboxResMessage,
	messageResSuccess,
	Routes,
	root,
} from "ecoledirecte-api-types/v3";
import { expandBase64, makeRequest } from "../functions/util";
import { expandedBase64 } from "../types/util";
import { Student } from "../accounts";

export class Message {
	private _user?: Student;
	/** @description Unique ID */
	readonly id: number;
	/** @description Direction of the message */
	readonly type: "received" | "sent";
	/** @description Whether it is marked as read */
	readonly read: boolean;
	/** @description Has it been transferred? */
	readonly transferred: boolean;
	/** @description Has it been answered? */
	readonly answered: boolean;
	/**
	 * @description Degree of implication
	 * @enum `to`: the message is directed to the user
	 * @enum `cc`: the message is not written for the user, but publicly adressed
	 * @enum `cci`: the message is not written for the user and is privately sent
	 * @enum ` `: the message isn't received
	 */
	readonly to_cc_cci: "to" | "cc" | "cci" | "";
	/** @description Subject, headline of the mail */
	readonly subject: string;
	/** @description When has this message been sent? */
	readonly date: Date;
	/** @description List of the addressees */
	readonly to: Array<{
		id: number;
		fullName: string;
		lastName: string;
		firstName: string;
		particle: string;
		civility: string;
		role: role;
		read: boolean;
		to_cc_cci: "to" | "cc" | "cci";
	}>;
	/** @description Sender */
	readonly from: {
		id: number;
		fullName: string;
		lastName: string;
		firstName: string;
		particle: string;
		civility: string;
		role: role;
		read: boolean;
	};
	/** @description Raw document straight from EcoleDirecte */
	readonly _raw: mailboxResMessage;

	constructor(o: mailboxResMessage, user?: Student) {
		this._user = user;

		this.id = o.id;
		this.type = o.mtype;
		this.read = o.read;
		this.transferred = o.transferred;
		this.answered = o.answered;
		this.to_cc_cci = o.to_cc_cci;
		this.subject = o.subject;
		this.date = new Date(o.date);
		this.to = o.to.map(r => ({
			id: r.id,
			fullName: r.name,
			lastName: r.nom,
			firstName: r.prenom,
			particle: r.particule,
			civility: r.civilite,
			role: r.role,
			read: r.read,
			to_cc_cci: r.to_cc_cci,
		}));
		this.from = {
			id: o.from.id,
			fullName: o.from.name,
			lastName: o.from.nom,
			firstName: o.from.prenom,
			particle: o.from.particule,
			civility: o.from.civilite,
			role: o.from.role,
			read: o.from.read,
		};
		this._raw = o;
	}

	/**
	 * @description Fetches the content of the mail
	 * NEEDS USER
	 */
	async getContent(): Promise<expandedBase64> {
		if (!this._user) throw new Error("User needs to be provided");
		const details: messageResSuccess = await makeRequest({
			method: "POST",
			url: new URL(
				Routes.studentMessage(this._user._raw.id, this.id, {
					mode: this.type === "received" ? "destinataire" : "expediteur",
				}),
				root
			).href,
			body: { token: this._user.token },
			guard: true,
		});
		return expandBase64(details.data.content);
	}
}
