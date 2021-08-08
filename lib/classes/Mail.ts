import {
	role,
	mailboxResMessage,
	messageResSuccess,
	Routes,
} from "ecoledirecte-api-types/v3";
import { makeRequest } from "../util";
import { ExpandedBase64 } from "../classes";
import { Student } from "../accounts";

export class Message {
	private _user?: Student;
	/** @description Unique ID */
	id: number;
	/** @description Direction of the message */
	type: "received" | "sent";
	/** @description Whether it is marked as read */
	read: boolean;
	/** @description Has it been transferred? */
	transferred: boolean;
	/** @description Has it been answered? */
	answered: boolean;
	/**
	 * @description Degree of implication
	 * @enum `to`: the message is directed to the user
	 * @enum `cc`: the message is not written for the user, but publicly adressed
	 * @enum `cci`: the message is not written for the user and is privately sent
	 * @enum ` `: the message isn't received
	 */
	to_cc_cci: "to" | "cc" | "cci" | "";
	/** @description Subject, headline of the mail */
	subject: string;
	/** @description When has this message been sent? */
	date: Date;
	/** @description List of the addressees */
	to: Array<{
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
	from: {
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
	_raw: mailboxResMessage;

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
	async getContent(): Promise<ExpandedBase64> {
		if (!this._user) throw new Error("User needs to be provided");
		const details: messageResSuccess = await makeRequest({
			method: "POST",
			path: Routes.studentMessage(this._user._raw.id, this.id, {
				mode: this.type === "received" ? "destinataire" : "expediteur",
			}),
			body: { token: this._user.token },
			guard: true,
		});
		return new ExpandedBase64(details.data.content);
	}
}
