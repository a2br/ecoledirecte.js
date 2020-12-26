import { _failureRes } from "../failureRes";
import { role } from "../util";

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
	content: string;
	date: string;
	to: Array<unknown>;
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
	direction: "received" | "sent";
};
