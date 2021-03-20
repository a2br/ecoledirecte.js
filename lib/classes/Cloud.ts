import { cloudResFolder, cloudResFile, role } from "ecoledirecte-api-types/v3";
import { Account } from "../accounts";
import { getCloudFolder } from "../functions";

export class Cloud {
	public _root: cloudResFolder;
	public _owner: Account;
	private _pathPrefix: string;
	constructor(root: cloudResFolder, owner: Account) {
		this._root = root;
		this._owner = owner;
		this._pathPrefix = root.id;
		if (root.quota === undefined)
			throw new Error("This doesn't seem to be the cloud's root.");
	}

	get quota(): number {
		return this._root.quota as number;
	}

	async root(): Promise<Folder> {
		return new Folder(this._root, this);
	}

	async get(path: string): Promise<Folder | File> {
		throw new Error("Unavailable");
	}
}

export class Folder {
	name: string;
	path: string;
	size: number;
	children: Array<Folder | File>;
	_raw: cloudResFolder;
	private _cloud: Cloud;
	constructor(o: cloudResFolder, cloud: Cloud) {
		const pathPrefix = cloud._root.id;

		this._cloud = cloud;
		this._raw = o;
		this.name = o.libelle;
		this.path = cleanPath(o.id, pathPrefix);
		this.size = o.taille;
		this.children = o.children.map(c => {
			if (!["folder", "file"].includes(c.type))
				throw new Error(`Unexpected cloud type: ${c.type}`);
			return c.type === "folder" ? new Folder(c, cloud) : new File(c, cloud);
		});
	}

	// getFullPath() {}

	// refresh() {}

	async loadFullTree(): Promise<Folder> {
		const fullTree = await getFullTree(this._raw, this._cloud);
		// function cleanBranch(folder: cloudResFolder) {
		// 	const tree: any = {};
		// 	folder.children.forEach(
		// 		c => (tree[c.libelle] = c.type === "folder" ? cleanBranch(c) : c.type)
		// 	);
		// 	return tree;
		// }
		// return cleanBranch(fullTree);
		return new Folder(fullTree, this._cloud);
	}

	// toJSON() {}
}

export class File {
	name: string;
	path: string;
	extension: string;
	date: Date;
	owner?: {
		id: number;
		type: role;
		firstName: string;
		lastName: string;
		particle?: string;
	};
	_raw: cloudResFile;
	constructor(o: cloudResFile, cloud: Cloud) {
		const pathPrefix = cloud._root.id;
		this._raw = o;
		this.name = o.libelle;
		this.path = cleanPath(o.id, pathPrefix);
		this.date = new Date(o.date);
		this.owner = o.proprietaire
			? {
					id: o.proprietaire.id,
					type: o.proprietaire.type,
					firstName: o.proprietaire.prenom,
					lastName: o.proprietaire.nom,
					particle: o.proprietaire.particule || undefined,
			  }
			: undefined;
		this.extension = getExtension(o.libelle);
	}

	async download(): Promise<Buffer> {
		throw new Error("Unavailable");
	}

	// toJSON() {}
}

export function getExtension(name: string): string {
	const dotSplit = name.split("."),
		dotLast = dotSplit[dotSplit.length - 1],
		extension = dotLast !== name && !!dotLast ? dotLast : "";
	return extension;
}

export function cleanPath(dirty: string, prefix: string): string {
	if (dirty === prefix) return "/";
	if (dirty.indexOf(prefix) === -1) throw new Error("Prefix expected");
	const clean =
		"/" +
		dirty
			.substr(dirty.indexOf(prefix) + (prefix + "\\").length)
			.replace(/\\/g, "/");
	return clean;
}

export async function getFullTree(
	folder: cloudResFolder,
	cloud: Cloud
): Promise<cloudResFolder> {
	let newFolder = folder;
	// Load folder
	if (!folder.isLoaded) {
		const folderRes = await getCloudFolder(
			cloud._owner.__raw.typeCompte,
			cloud._owner.__raw.id,
			cloud._owner.token,
			encodeURI(cleanPath(folder.id, cloud._root.id).replace(/\//g, "\\"))
		);
		newFolder = folderRes.data[0];
	}
	// Recursively call function
	newFolder.children = await Promise.all(
		newFolder.children.map(async c =>
			c.type === "folder" ? getFullTree(c, cloud) : c
		)
	);

	return newFolder;
}
