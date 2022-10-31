import { Account } from "./Account";
import { Session } from "../Session";

import {
	loginResSuccess,
	teacherAccount,
	isTeacherAccount,
	schoolsResSuccess,
	studentsResSuccess,
} from "ecoledirecte-api-types/v3";
import { getMainAccount, fetchPhoto } from "../util";
import { getTeachersSchools } from "../util/teacher/schools";
import { TeachersSchool, TeachersStudent } from "../classes/School";
import { getTeachersStudents } from "../util/teacher/students";

export class Teacher extends Account {
	public type: "teacher" = "teacher";
	private account: teacherAccount;

	constructor(private session: Session) {
		super(session);

		const mainAccount = getMainAccount(
			(session.loginRes as loginResSuccess).data.accounts
		);

		if (!isTeacherAccount(mainAccount))
			throw new Error("Teacher class's main account is wrong");

		if (!session.token) throw new Error("Account class MUST have token");

		this.account = mainAccount;
		this.token = session.token;
	}
	// Get schools
	async getSchools(): Promise<
		[schools: TeachersSchool[], _raw: schoolsResSuccess]
	> {
		// Get schools
		const res = await getTeachersSchools(this.token);
		this.token = res.token;
		const schools = res.data.etablissements.map(e => new TeachersSchool(e));
		return [schools, res];
	}

	// Get students (from class id)
	async getStudents(
		classId: number
	): Promise<[students: TeachersStudent[], _raw: studentsResSuccess]> {
		const res = await getTeachersStudents(this.token, classId);
		this.token = res.token;
		const students = res.data.eleves.map(e => new TeachersStudent(e));
		return [students, res];
	}

	private _photo?: Buffer;
	private _photoUri?: string;

	async getPhoto(): Promise<Buffer | undefined> {
		const r = await fetchPhoto(this);
		if (!r) return;
		const [buf, str] = r;
		this._photo = buf;
		this._photoUri = str;
		return buf;
	}

	get photo(): {
		buffer?: Buffer;
		uri?: string;
	} {
		return {
			buffer: this._photo,
			uri: this._photoUri,
		};
	}

	get _raw(): teacherAccount {
		return this.account;
	}
}
