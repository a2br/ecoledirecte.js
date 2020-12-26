import { _failureRes } from "../failureRes";

export type assignement = {
	id: number;
	interro: boolean;
	matiere: {
		nom: string;
		code: string;
	};
	prof: string;
	contenuDeSeance: {
		idDevoir: number;
		contenu: {
			original: string;
			html: string;
			text: string;
		};
		documents: unknown[];
	};
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
