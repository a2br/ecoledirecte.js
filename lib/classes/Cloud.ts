import { cloudResFolder, cloudResFile } from "ecoledirecte-api-types/v3";

export class Folder {
	name: string;
	children: Array<Folder | File>;
	_raw: cloudResFolder;
	constructor(o: cloudResFolder) {
		this._raw = o;
		this.name = o.libelle;
	}

	getFullPath() {}

	refresh() {}

	loadFullTree() {}

	toJSON() {}
}

export class File {
	constructor(o: cloudResFile) {}

	download() {}

	toJSON() {}
}
