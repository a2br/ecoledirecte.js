import {
	studTlElem as _studTlElem,
	studCommonTlEvent as _studCommonTlEvent,
} from "ecoledirecte-api-types";
import { expandedBase64 } from "../util";

export type studTlElem = {
	date: Date;
	type: string;
	id: number;
	title: string;
	subtitle: string;
	content: string;
	_raw: _studTlElem;
};

export type studTlEvent = {
	id: number;
	title: string;
	description: expandedBase64;
	start: Date;
	end: Date;
	cibles: Array<"F" | "E" | "A" | "P">;
	_raw: _studCommonTlEvent;
};
