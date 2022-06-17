import {
	compte as _compte,
	ecriture as _ecriture,
} from "ecoledirecte-api-types";

export type walletType = "wallet" | "activity";

export class Wallet {
	id: number;
	/**
	 * Should be identical to `id`
	 */
	studentId: number;
	type: walletType;
	available: boolean;

	unitCost: number;
	editableAmount: boolean;
	editableQuantity: boolean;
	code: string;

	classServiceId: number;
	name: string;

	balance: number;

	future: unknown[];
	transactions: Transaction[];

	_raw: _compte;

	constructor(o: _compte) {
		this.id = o.id;
		this.studentId = o.idEleve;
		this.type = o.typeCompte === "portemonnaie" ? "wallet" : "activity";
		this.available = o.disponible;
		this.unitCost = o.montantVersement;
		this.editableAmount = o.montantModifiable;
		this.editableQuantity = o.quantiteModifiable;
		this.code = o.codeCompte;
		this.classServiceId = o.idServiceClasse;
		this.name = o.libelleCompte;
		this.balance = o.solde;
		this.future = o.avenir;
		this.transactions = o.ecritures && o.ecritures.map(e => new Transaction(e));

		this._raw = o;
	}
}

export class Transaction {
	date: Date;
	name?: string;
	lettering?: string;
	compInfo?: string;
	amount: number;
	transactions?: Transaction[];

	_raw: _ecriture;

	constructor(o: _ecriture) {
		this.date = new Date(o.date);
		this.name = o.libelle;
		this.lettering = o.lettrage || undefined;
		this.compInfo = o.infoComp || undefined;
		this.amount = o.montant;
		this.transactions = o.ecritures && o.ecritures.map(e => new Transaction(e));

		this._raw = o;
	}
}
