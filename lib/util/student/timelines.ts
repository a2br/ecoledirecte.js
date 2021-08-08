import { Routes } from "ecoledirecte-api-types/v3";
import {
	studCommonTlResSuccess,
	studTlResSuccess,
} from "ecoledirecte-api-types/v3";

import { makeRequest } from "../util";

export async function getTimeline(
	id: number,
	token: string,
	context: Record<string, unknown> = {}
): Promise<studTlResSuccess> {
	const body: studTlResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.studentTimeline(id),
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getTimeline", ...context }
	);

	return body;
}

export async function getCommonTimeline(
	id: number,
	token: string,
	context: Record<string, unknown> = {}
): Promise<studCommonTlResSuccess> {
	const body: studCommonTlResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.commonTimeline("E", id),
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getCommonTimeline", ...context }
	);

	return body;
}
