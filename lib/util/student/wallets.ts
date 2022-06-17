//TODO See ed-api-types & Postman research

import { Routes, walletsResSuccess } from "ecoledirecte-api-types/v3";
import { makeRequest } from "../util";

export async function getWallets(
	token: string,
	context: Record<string, unknown> = {}
): Promise<walletsResSuccess> {
	const body: walletsResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.studentWallets(),
			body: {},
			guard: true,
		},
		{ action: "getWallets", ...context },
		undefined,
		token
	);
	return body;
}
