import { root, Routes } from "ecoledirecte-api-types";
import { _notesResSuccess } from "../../types";
import { makeRequest } from "../util";

export async function getGrades(
	id: number,
	token: string
): Promise<_notesResSuccess> {
	const body: _notesResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentGrades(id), root).href,
		body: { token },
		guard: true,
	});

	return body;
}
