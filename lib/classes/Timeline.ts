import {
	studTlElem as _studTlElem,
	studCommonTlEvent as _studCommonTlEvent,
} from "ecoledirecte-api-types/v3";
import { ExpandedBase64 } from "./ExpandedB64";

export class TimelineElem {
	date: Date;
	type: string;
	id: number;
	title: string;
	subtitle: string;
	content: string;
	_raw: _studTlElem;
	constructor(o: _studTlElem) {
		this.date = new Date(o.date);
		this.type = o.typeElement;
		this.id = o.idElement;
		this.title = o.titre;
		this.subtitle = o.soustitre;
		this.content = o.contenu;
		this._raw = o;
	}
}

export class TimelineEvent {
	id: number;
	title: string;
	description: ExpandedBase64;
	start: Date;
	end: Date;
	cibles: Array<"F" | "E" | "A" | "P">;
	_raw: _studCommonTlEvent;

	constructor(o: _studCommonTlEvent) {
		this.id = o.id;
		this.title = o.libelle;
		this.description = new ExpandedBase64(o.description);
		this.start = new Date(o.dateDebut + " " + (o.heureDebut || ""));
		this.end = new Date(o.dateFin + " " + (o.heureFin || ""));
		this.cibles = o.cibles;
		this._raw = o;
	}
}
