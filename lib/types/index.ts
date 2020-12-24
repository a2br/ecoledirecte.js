//! GENERAL

export type _failureRes = {
	code: number;
	token: "";
	host?: string;
	message: string;
	data?: {
		accounts?: [];
	};
};

//! LOGIN REQ

export type _loginRes = _loginResSuccess | _failureRes;

export type _loginResSuccess = {
	code: 200;
	token: string;
	message: "";
	data: {
		accounts: Array<account>;
	};
};

export type account =
	| studentAccount
	| teacherAccount
	| familyAccount
	| staffAccount;

export type studentAccount = {
	/** Changes frequently. */
	idLogin: number;

	/** Unique and immutable. May be used to recognize an account. */
	id: number;

	uid: string;

	/** Unique, but may change */
	identifiant: string;

	typeCompte: "E";

	codeOgec: string;

	main: boolean;

	/** Time the request has been made */
	lastConnexion: string;

	civilite: string;

	prenom: string;

	particule: string;

	nom: string;

	/** May be empty */
	email: string;

	anneeScolaireCourante: string;

	nomEtablissement: string;

	logoEtablissement: string;

	couleurAgendaEtablissement: string;

	accessToken: string;

	socketToken: string;

	modules: Array<accountModule>;

	parametresIndividuels: {
		lsuPoilDansLaMainBorne1: string;
		lsuPoilDansLaMainBorne2: string;
		lsuPoilDansLaMainBorne3: string;
		modeCalculLSU: string;
		isQrcode: boolean;
		modeAccessibiliteVisuelle: boolean;
		typeSaisieNotesDefaut: string;
		nbJoursMaxRenduDevoirCDT: string;
	};
	profile: {
		sexe: string;
		infoEDT: string;
		nomEtablissement: string;
		idEtablissement: number;
		idReelEtab: number;
		photo: string;
		classe?: {
			id: number;
			code: string;
			libelle: string;
		};
	};
};

export type familyAccount = {
	idLogin: number;
	id: number;
	uid: string;
	identifiant: string;
	typeCompte: "1";
	codeOgec: string;
	main: boolean;
	lastConnexion: string;
	civilite: string;
	prenom: string;
	particule: string;
	nom: string;
	email: string;
	anneeScolaireCourante: string;
	nomEtablissement: string;
	logoEtablissement: string;
	couleurAgendaEtablissement: string;
	accessToken: string;
	socketToken: string;
	modules: Array<accountModule>;
	parametresIndividuels: {
		lsuPoilDansLaMainBorne1: string;
		lsuPoilDansLaMainBorne2: string;
		lsuPoilDansLaMainBorne3: string;
		modeCalculLSU: string;
		isQrcode: boolean;
		modeAccessibiliteVisuelle: boolean;
		typeSaisieNotesDefaut: string;
		nbJoursMaxRenduDevoirCDT: string;
		typeViewCDTDefaut: string;
	};
	profile: {
		email: string;
		telPortable: string;
		telPortableConjoint: string;
		eleves: Array<{
			id: number;
			prenom: string;
			nom: string;
			sexe: string;
			infoEDT: string;
			photo: string;
			nomEtablissement: string;
			idEtablissement: string;
			idReelEtab: string;
			modules: Array<accountModule>;
			classe: {
				id: number;
				code: string;
				libelle: string;
			};
		}>;
	};
};

export type teacherAccount = {
	idLogin: number;
	id: number;
	uid: string;
	identifiant: string;
	typeCompte: "P";
	codeOgec: string;
	main: boolean;
	lastConnexion: string;
	civilite: string;
	prenom: string;
	particule: string;
	nom: string;
	email: string;
	anneeScolaireCourante: string;
	nomEtablissement: string;
	logoEtablissement: string;
	couleurAgendaEtablissement: string;
	accessToken: string;
	socketToken: string;
	modules: Array<accountModule>;
	parametresIndividuels: {
		lsuPoilDansLaMainBorne1: string;
		lsuPoilDansLaMainBorne2: string;
		lsuPoilDansLaMainBorne3: string;
		modeCalculLSU: string;
		isQrcode: boolean;
		modeAccessibiliteVisuelle: boolean;
		typeSaisieNotesDefaut: string;
		nbJoursMaxRenduDevoirCDT: string;
	};
	profile: {
		sexe?: string;
		infoEDT?: string;
		nomEtablissement: string;
		idEtablissement: number;
		photo: string;
		classes?: Array<{
			id: number;
			code: string;
			libelle: string;
			idGroupe: number;
		}>;
	};
};
export type staffAccount = {
	idLogin: number;
	id: number;
	uid: string;
	identifiant: string;
	typeCompte: "A";
	codeOgec: string;
	main: boolean;
	lastConnexion: string;
	civilite: string;
	prenom: string;
	particule: string;
	nom: string;
	email: string;
	anneeScolaireCourante: string;
	nomEtablissement: string;
	logoEtablissement: string;
	couleurAgendaEtablissement: string;
	accessToken: string;
	socketToken: string;
	modules: Array<accountModule>;
	parametresIndividuels: {
		lsuPoilDansLaMainBorne1: string;
		lsuPoilDansLaMainBorne2: string;
		lsuPoilDansLaMainBorne3: string;
		modeCalculLSU: string;
		isQrcode: boolean;
		modeAccessibiliteVisuelle: boolean;
		typeSaisieNotesDefaut: string;
		nbJoursMaxRenduDevoirCDT: string;
	};
	profile: {
		nomEtablissement: string;
		idEtablissement: number;
		photo: string;
		email?: string;
	};
};

export type accountModule = {
	code: string;
	enable: boolean;
	ordre: number;
	badge: number;
	params: object;
};

//! TEXTBOOK REQ

//? WITH DATE

export type _textbookDateRes = _textbookDateResSuccess | _failureRes;

export type _textbookDateResSuccess = {
	code: 200;
	token: string;
	host: string;
	data: {
		date: string;
		matieres: Array<_textbookDateAssignement>;
	};
};

type _textbookDateAssignement = {
	entityCode: string;
	entityLibelle: string;
	entityType: string;
	matiere: string;
	codeMatiere: string;
	nomProf: string;
	id: number;
	interrogation: boolean;
	blogActif: boolean;
	nbJourMaxRenduDevoir: number;
	contenuDeSeance: {
		idDevoir: number;
		/** BASE64 */
		contenu: string;
		documents: Array<unknown>;
		elementsProg: Array<unknown>;
		liensManuel: Array<unknown>;
	};
};

//? WITHOUT DATE

export type _textbookRes = _textbookResSuccess | _failureRes;

export type _textbookResSuccess = {
	code: 200;
	token: string;
	host: string;

	/**
	 * UNPREDICTABLE KEYS
	 * @example data["2020-01-14"]: Arrray<_textbookAssignement>
	 */
	data: any;
};

export type _textbookAssignement = {
	matiere: string;
	codeMatiere: string;
	aFaire: boolean;
	idDevoir: number;
	documentsAFaire: boolean;
	donneLe: string;
	effectue: boolean;
	interrogation: boolean;
	rendreEnLigne: boolean;
};

//! MAILBOX

export type _mailboxRes = _mailboxResSuccess | _failureRes;

export type _mailboxResSuccess = {
	code: 200;
	token: string;
	host: string;
	data: {
		classeurs: Array<unknown>;
		messages: {
			received: Array<any>;
			sent: Array<any>;
			archived: Array<any>;
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
			messagerieApiVersion: string;
			blackListProfActive: boolean;
			estEnBlackList: boolean;
			afficherToutesLesClasses: boolean;
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
		role: string; // Probably E, P, A...
		listeRoute: boolean;
		id: number;
		read: boolean;
		fonctionPersonnel: string;
	};
};
