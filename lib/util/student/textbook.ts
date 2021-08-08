import { Routes } from "ecoledirecte-api-types/v3";

import { makeRequest } from "../util";

import {
	textbookResSuccess,
	textbookDateResSuccess,
	textbookDateAssignement,
} from "ecoledirecte-api-types/v3";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getUpcomingAssignementDates(
	id: number,
	token: string,
	context: Record<string, unknown> = {}
): Promise<{ dates: string[]; token: string }> {
	const body: textbookResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.studentHomework(id),
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getUpcomingAssignementDates", ...context }
	);

	const dates = Object.keys(body.data); // .map((date) => new Date(date));

	return { dates, token: body.token || token };
}

/**
 * @param id Account id
 * @param token Auth token
 * @param date Date of the textbook page (YYYY-MM-DD)
 */
export async function getTextbookPage(
	id: number,
	token: string,
	date: string,
	context: Record<string, unknown> = {}
): Promise<textbookDateResSuccess> {
	const body: textbookDateResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.studentHomeworkDate(id, date),
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getTextbookPage", ...context }
	);

	return body;
}

export async function tickAssignement(
	id: number,
	token: string,
	assignement: textbookDateAssignement,
	state?: boolean,
	context: Record<string, unknown> = {}
): Promise<{ code: 200; token: string; host: string }> {
	if (!("aFaire" in assignement)) throw Error("No work in this assignement.");
	if (state === undefined) state = !assignement.aFaire?.effectue;

	const data: {
		token: string;
		idDevoirsEffectues?: number[];
		idDevoirsNonEffectues?: number[];
	} = {
		token: token,
	};
	if (state) data.idDevoirsEffectues = [assignement.id];
	if (!state) data.idDevoirsNonEffectues = [assignement.id];

	const body: { code: 200; token: string; host: string } = await makeRequest(
		{
			method: "POST",
			path: Routes.studentHomework(id, { verbe: "put" }),
			body: data,
			guard: true,
		},
		{
			userId: id,
			assignementId: assignement.id,
			action: "tickAssignement",
			...context,
		}
	);

	return body;
}
