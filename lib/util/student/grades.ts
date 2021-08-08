import { Routes, gradesResSuccess } from "ecoledirecte-api-types/v3";
import { makeRequest } from "../util";

export async function getGrades(
	id: number,
	token: string,
	context: Record<string, unknown> = {}
): Promise<gradesResSuccess> {
	const body: gradesResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.studentGrades(id),
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getGrades", ...context }
	);

	return body;
}
