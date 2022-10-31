import {
	teacherSchool as _school,
	teacherLevel as _level,
	teacherClass as _class,
	teacherStudent as _student,
} from "ecoledirecte-api-types";

export class TeachersSchool {
	id: number;
	code: string;
	name: string;

	levels: TeachersLevel[];

	_raw: _school;

	constructor(o: _school) {
		this.id = o.id;
		this.code = o.code;
		this.name = o.libelle;

		this.levels = o.niveaux.map(l => new TeachersLevel(l));

		this._raw = o;
	}
}

export class TeachersLevel {
	id: number;
	code: string;
	name: string;

	classes: TeachersClass[];

	_raw: _level;

	constructor(o: _level) {
		this.id = o.id;
		this.code = o.code;
		this.name = o.libelle;

		this.classes = o.classes.map(c => new TeachersClass(c));

		this._raw = o;
	}
}

export class TeachersClass {
	id: number;
	code: string;
	name: string;

	isHeadTeacher: boolean;
	headTeachers: {
		id: number;
		firstName: string;
		lastName: string;
	}[];

	_raw: _class;

	constructor(o: _class) {
		this.id = o.id;
		this.code = o.code;
		this.name = o.libelle;

		this.isHeadTeacher = o.isPP;
		this.headTeachers = o.tabPP.map(r => ({
			id: r.id,
			firstName: r.prenom,
			lastName: r.nom,
		}));

		this._raw = o;
	}
}

export class TeachersStudent {
	id: number;
	firstName: string;
	lastName: string;

	_raw: _student;

	constructor(o: _student) {
		this.id = o.id;
		this.firstName = o.prenom;
		this.lastName = o.nom;

		this._raw = o;
	}
}
