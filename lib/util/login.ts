import { root, Routes } from "ecoledirecte-api-types/v3";

import { makeRequest } from "./util";
import { loginRes, account } from "ecoledirecte-api-types/v3";

/**
 * @returns EcoleDirecte `/v3/login.awp` response
 */
export async function login(
	username: string,
	password: string,
	context: Record<string, unknown> = {}
): Promise<loginRes> {
	const body: loginRes = await makeRequest(
		{
			method: "POST",
			url: new URL(Routes.login(), root).href,
			body: {
				identifiant: username,
				motdepasse: password,
				acceptationCharte: true,
			},
		},
		{ action: "login", username, password, ...context }
	);

	return body;
}

/**
 * @returns The main account of the array
 */
export function getMainAccount(accounts: Array<account>): account {
	const mainAccount = accounts.find(acc => acc.main) || accounts[0] || null;
	return mainAccount;
}
