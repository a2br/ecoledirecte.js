import { root, Routes } from "ecoledirecte-api-types";

import { makeRequest } from "../util";

import {
	textbookResSuccess,
	textbookDateResSuccess,
	textbookDateAssignement,
} from "ecoledirecte-api-types";

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getUpcomingAssignementDates(
	id: number,
	token: string
): Promise<{ dates: string[]; token: string }> {
	const body: textbookResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomework(id), root).href,
		body: { token },
		guard: true,
	});

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
	date: string
): Promise<textbookDateResSuccess> {
	const body: textbookDateResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomeworkDate(id, date), root).href,
		body: { token },
		guard: true,
	});

	return body;
}

export async function tickAssignement(
	id: number,
	token: string,
	assignement: textbookDateAssignement,
	state?: boolean
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

	const body: { code: 200; token: string; host: string } = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentHomework(id, { verbe: "put" }), root).href,
		body: data,
		guard: true,
	});

	return body;
}
