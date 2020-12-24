//! LOGIN REQ

export type loginRes = loginResSuccess | loginResFail;

export type loginResSuccess = {
	code: 200;
	token: string;
	message: "";
	data: {
		accounts: Array<account>;
	};
};
export type loginResFail = {
	code: number;
	token: "";
	host?: string;
	message: string;
};

export type account = studentAccount | teacherAccount | staffAccount;

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

export type textbookResDate = {
	code: 200;
	token: string;
	host: string;
	data: {
		date: string;
		matieres: Array<textbookDateAssignement>;
	};
};

export type textbookDateAssignement = {};
