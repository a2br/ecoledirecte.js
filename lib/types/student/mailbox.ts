import { role, expandedBase64 } from "../util";
import { _failureRes } from "../failureRes";

export type _mailboxRes = _mailboxResSuccess | _failureRes;

export type _mailboxResSuccess = {
	code: 200;
	token: string;
	host: string;
	data: {
		classeurs: Array<unknown>;
		messages: {
			received: Array<_mailboxResMessage>;
			sent: Array<_mailboxResMessage>;
			archived: Array<_mailboxResMessage>;
		};
		parametrage: {
			isActif: boolean;
			canParentsLireMessagesEnfants: boolean;
			destAdmin: boolean;
			destEleve: boolean;
			destFamille: boolean;
			destProf: boolean;
			destEspTravail: boolean;
			disabledNotification: boolean;
			notificationEmailEtablissement: boolean;
			choixMailNotification: number;
			autreMailNotification: string;
			mailPro: string;
			mailPerso: string;
			messagerieApiVersion: "v3" | string;
			blackListProfActive: boolean;
			estEnBlackList: boolean;
			afficherToutesLesClasses: boolean;
		};
		pagination: {
			messagesRecusCount: number;
			messagesEnvoyesCount: number;
			messagesArchivesCount: number;
			messagesRecusNotReadCount: number;
		};
	};
};

type _mailboxResMessage = {
	id: number;
	mtype: "received" | "sent";
	read: boolean;
	idDossier: number;
	idClasseur: number;
	transferred: boolean;
	answered: boolean;
	to_cc_cci: "to" | "cc" | "cci";
	subject: string;
	/** Very probably always empty */
	content: string;
	date: string;
	to: Array<{
		civilite: string;
		fonctionPersonnel: string;
		id: number;
		name: string;
		nom: string;
		particule: string;
		prenom: string;
		read: boolean;
		role: role;
		to_cc_cci: "to" | "cc" | "cci";
	}>;
	files: Array<{
		id: number;
		libelle: string;
		date: string;
		type: string;
		signatureDemandee: boolean;
		signature: unknown; // {}
	}>;
	from: {
		name: string;
		nom: string;
		prenom: string;
		particule: string;
		civilite: string;
		role: role;
		listeRoute: boolean;
		id: number;
		read: boolean;
		fonctionPersonnel: string;
	};
};

export type message = {
	id: number;
	type: "received" | "sent";
	read: boolean;
	transferred: boolean;
	answered: boolean;
	to_cc_cci: "to" | "cc" | "cci";
	subject: string;
	getContent: () => Promise<expandedBase64>;
	date: Date;
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
	_raw: _mailboxResMessage;
};

export type _messageResSuccess = {
	code: 200;
	token: string;
	host: string;
	data: {
		id: number;
		mtype: "send" | string;
		read: boolean;
		idDossier: number;
		idClasseur: number;
		transferred: boolean;
		answered: boolean;
		to_cc_cci: "" | "to" | "cc" | "cci";
		subject: string;
		/** BASE64 */
		content: string;
		date: string; // "2020-07-17 10:10:40";
		to: Array<{
			name: string;
			nom: string;
			prenom: string;
			particule: string;
			civilite: string;
			role: role;
			id: number;
			read: boolean;
			to_cc_cci: "to" | "cc" | "cci";
			fonctionPersonnel: string;
		}>;

		files: Array<{
			id: number;
			libelle: string;
			date: string; // "2020-07-17";
			type: "PIECE_JOINTE" | string;
			signatureDemandee: boolean;
			signature: unknown;
		}>;
		from: {
			name: string;
			nom: string;
			prenom: string;
			particule: string;
			civilite: string;
			role: role;
			listeRouge: boolean;
			id: number;
			read: boolean;
			fonctionPersonnel: string;
		};
	};
};
