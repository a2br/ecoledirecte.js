import { expandedBase64 } from "..";

import { textbookDateAssignement as _textbookDateAssignement } from "ecoledirecte-api-types";
export {
	textbookDateRes as _textbookDateRes,
	textbookDateResSuccess as _textbookDateResSuccess,
	textbookDateAssignement as _textbookDateAssignement,
	textbookRes as _textbookRes,
	textbookResSuccess as _textbookResSuccess,
	textbookAssignement as _textbookAssignement,
} from "ecoledirecte-api-types";

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
