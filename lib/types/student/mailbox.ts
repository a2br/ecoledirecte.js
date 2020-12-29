import { role, expandedBase64 } from "../util";

import { mailboxResMessage as _mailboxResMessage } from "ecoledirecte-api-types";
export {
	mailboxRes as _mailboxRes,
	mailboxResSuccess as _mailboxResSuccess,
	mailboxResMessage as _mailboxResMessage,
	messageResSuccess as _messageResSuccess,
} from "ecoledirecte-api-types";

export type message = {
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
	/** @description Fetches the content of the mail */
	getContent: () => Promise<expandedBase64>;
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
	_raw: _mailboxResMessage;
};
