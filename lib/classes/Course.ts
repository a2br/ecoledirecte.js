import { course as _course } from "ecoledirecte-api-types/v3";

export class Course {
	id: number;
	text: string;
	courseType: string;

	subject: string;
	subjectCode: string;

	teacher: string;
	room: string;
	class: string;
	classCode: string;

	group: string;
	groupCode: string;

	startDate: Date;
	endDate: Date;

	isFlexible: boolean;
	isModified: boolean;
	isCancelled: boolean;

	color: string;
	icon: string;

	isExemptable: boolean;
	isExempted: number;

	hasSessionContent: boolean;
	hasHomework: boolean;

	_raw: _course;

	constructor(o: _course) {
		this.id = o.id;
		this.text = o.text;
		this.courseType = o.typeCours;

		this.subject = o.matiere;
		this.subjectCode = o.codeMatiere;

		this.teacher = o.prof;
		this.room = o.salle;
		this.class = o.classe;
		this.classCode = o.classeCode;

		this.group = o.groupe;
		this.groupCode = o.groupeCode;

		this.startDate = new Date(o.start_date);
		this.endDate = new Date(o.end_date);

		this.isFlexible = o.isFlexible;
		this.isModified = o.isModifie;
		this.isCancelled = o.isAnnule;

		this.color = o.color;
		this.icon = o.icone;

		this.isExemptable = o.dispensable;
		this.isExempted = o.dispense;

		this.hasSessionContent = o.contenuDeSeance;
		this.hasHomework = o.devoirAFaire;

		this._raw = o;
	}

	toJSON(): courseJson {
		return {
			id: this.id,
			text: this.text,
			courseType: this.courseType,

			subject: this.subject,
			subjectCode: this.subjectCode,

			teacher: this.teacher,
			room: this.room,
			class: this.class,
			classCode: this.classCode,

			group: this.group,
			groupCode: this.groupCode,

			startDate: this.startDate,
			endDate: this.endDate,

			isFlexible: this.isFlexible,
			isModified: this.isModified,
			isCancelled: this.isCancelled,

			color: this.color,
			icon: this.icon,

			isExemptable: this.isExemptable,
			isExempted: this.isExempted,

			hasSessionContent: this.hasSessionContent,
			hasHomework: this.hasHomework,

			_raw: this._raw,
		};
	}
}

export interface courseJson {
	id: number;
	text: string;
	courseType: string;
	subject: string;
	subjectCode: string;
	teacher: string;
	room: string;
	class: string;
	classCode: string;
	group: string;
	groupCode: string;
	startDate: Date;
	endDate: Date;
	isFlexible: boolean;
	isModified: boolean;
	isCancelled: boolean;
	color: string;
	icon: string;
	isExemptable: boolean;
	isExempted: number;
	hasSessionContent: boolean;
	hasHomework: boolean;
	_raw: _course;
}
