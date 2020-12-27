import { _failureRes } from "./failureRes";

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
	params: Record<string, unknown>;
};

//! TYPE GUARDS

/**
 * @returns Whether `account` is `studentAccount`
 */
export function isStudentAccount(account: account): account is studentAccount {
	return account.typeCompte === "E";
}

/**
 * @returns Whether `account` is `teacherAccount`
 */
export function isTeacherAccount(account: account): account is teacherAccount {
	return account.typeCompte === "P";
}

/**
 * @returns Whether `account` is `familyAccount`
 */
export function isFamilyAccount(account: account): account is familyAccount {
	return account.typeCompte === "1";
}

/**
 * @returns Whether `account` is `staffAccount`
 */
export function isStaffAccount(account: account): account is staffAccount {
	return account.typeCompte === "A";
}
