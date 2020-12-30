import { note as _note, periode as _periode } from "ecoledirecte-api-types";
export { reportCardResSuccess as _notesResSuccess } from "ecoledirecte-api-types";

import { expandedBase64 } from "../";

export type grade = {
	name: string;
	value: number | string;
	class?: {
		max: number | string;
		avg: number | string;
		min: number | string;
	};
	denominator: number;
	weight: number;
	uncounted: boolean;
	isLetter: boolean;
	date: Date;
	dateTyped: Date;
	periodCode: string;
	subject: {
		code: string;
		name: string;
		minor: string;
	};
	elements: Array<{
		id: number;
		competenceId: number;
		name: string;
		description: string;
		value: string;
	}>;
	qcm?: {
		id: number;
		name: string;
		startsAt: Date;
	};
	_raw: _note;
};

export type period = {
	id: string;
	name: string;
	yearly: boolean;
	closed: boolean;
	start: Date;
	end: Date;
	mockExam: boolean;
	headcount?: number;
	rank?: number;
	headTeacher?: string;
	appraisals?: {
		CE?: string;
		PP?: string;
		VS?: string;
	};
	class?: {
		appraisal?: string;
		averageGrade?: number;
	};
	council?: {
		start?: Date;
		end?: Date;
		room?: string;
		verdict?: string;
	};
	calcDate?: Date;
	subjects: Array<subject>;
	_raw: _periode;
};

type subject = {
	id: number;
	code: string;
	name: string;
	weight: number;
	headcount: number;
	rank: number;
	minor: boolean;
	minorCode?: string;
	group: boolean;
	groupId: number;
	appraisals: Array<expandedBase64>;
	option: number;
	teachers: Array<{
		id: number;
		name: string;
	}>;
	class?: {
		appraisal?: expandedBase64;
		max?: number;
		avg?: number;
		min?: number;
	};
};
