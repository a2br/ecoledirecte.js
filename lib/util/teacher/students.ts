// Function that retrieves students for specific class
// input: token, class id

import { Routes, studentsResSuccess } from "ecoledirecte-api-types";
import { makeRequest } from "../util";

export async function getTeachersStudents(
	token: string,
	classId: number
): Promise<studentsResSuccess> {
	const body: studentsResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.teacherStudents(classId),
			body: { token },
			guard: true,
			teachRoot: true,
		},
		{ action: "getTeachersStudents" }
	);

	return body;
}
