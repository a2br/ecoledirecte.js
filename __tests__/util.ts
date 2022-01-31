import dotenv = require("dotenv");
dotenv.config();

export function getTestAccount(
	type: "student" | "family" | "teacher" | "staff"
): {
	username: string;
	password: string;
} {
	switch (type) {
		case "student":
			return {
				username: process.env.TEST_STUDENT_USERNAME || "EDELEVE",
				password: process.env.TEST_STUDENT_PASSWORD || "0",
			};
		case "family":
			return {
				username: process.env.TEST_FAMILY_USERNAME || "EDFAMILLE",
				password: process.env.TEST_FAMILY_PASSWORD || "0",
			};
		case "teacher":
			return {
				username: process.env.TEST_TEACHER_USERNAME || "EDPROF",
				password: process.env.TEST_TEACHER_PASSWORD || "0",
			};
		case "staff":
			return {
				username: process.env.TEST_STAFF_USERNAME || "EDPERSONNEL",
				password: process.env.TEST_STAFF_PASSWORD || "0",
			};
		default:
			throw new Error("Invalid account type");
	}
}
