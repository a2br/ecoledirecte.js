import { downloadDocument } from "../util";
import { studentDoc as _doc } from "ecoledirecte-api-types/v3";
import { Account } from "../accounts";

export class Document {
	date: Date;
	id: number;
	studentId: number;
	name: string;
	type?: string;

	_raw: _doc;

	constructor(o: _doc, private account: Account, private archiveYear?: string) {
		this.date = new Date(o.date);
		this.id = o.id;
		this.studentId = o.idEleve;
		this.name = o.libelle;
		this.type = o.type || undefined;

		this._raw = o;
	}

	async download() {
		const doc = await downloadDocument(
			this.account.token,
			this.id,
			this.type || "",
			this.archiveYear
		);
		return doc;
	}
}
