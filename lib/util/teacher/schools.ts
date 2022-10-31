// Function that fetches school (input: token)

import { makeRequest } from "../util";
import { schoolsResSuccess, Routes } from "ecoledirecte-api-types";

export async function getTeachersSchools(
	token: string
): Promise<schoolsResSuccess> {
	const body: schoolsResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.teacherSchools(),
			body: { token },
			guard: true,
			teachRoot: true,
		},
		{ action: "getTeachersSchools" }
	);

	return body;
}
