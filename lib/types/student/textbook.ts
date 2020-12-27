import { expandedBase64 } from "..";
import { _failureRes } from "../failureRes";

export type assignement = {
	/** @description Unique ID */
	id: number;
	/** @description Date for which the assignement is due */
	date: Date;
	/** @description Whether it represents a test or not */
	test: boolean;
	/** @description Concerned subject */
	subject: {
		name: string;
		code: string;
	};
	/** @description Teacher who created the assignement */
	teacher: string;
	/** @description The homework itself */
	job?: {
		content: expandedBase64;
		givenAt: Date;
		/** @description Whether the homework should be returned through EcoleDirecte */
		toReturnOnline: boolean;
		done: boolean;
		/** @description `contenuDeSeance` of the last course */
		lastContenuDeSeance: {
			content: expandedBase64;
			documents: unknown[];
		};
		/** @description Mark the homework as done or not. No `newState` will set it as the opposite of the current state */
		tick: (newState?: boolean) => Promise<boolean>;
	};
	/** @description The day's `contenuDeSeance`. May not be displayed in the EcoleDirecte UI if the date is in the future */
	contenuDeSeance: {
		homeworkId: number;
		content: expandedBase64;
		documents: unknown[];
	};
	/** @description Raw document straight from EcoleDirecte */
	_raw: _textbookDateAssignement;
};

//! RESPONSES

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

export type _textbookDateAssignement = {
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
	aFaire?: {
		idDevoir: number;
		/** BASE64 */
		contenu: string;
		rendreEnLigne: boolean;
		donneLe: string;
		effectue: boolean;
		ressource: string;
		ressourceDocuments: unknown[];
		documents: unknown[];
		elementsProg: unknown[];
		liensManuel: unknown[];
		documentsRendus: unknown[];
		/** The last one */
		contenuDeSeance: {
			/** BASE64 */
			contenu: string;
			documents: unknown[];
		};
	};
	/** The one of the day */
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
