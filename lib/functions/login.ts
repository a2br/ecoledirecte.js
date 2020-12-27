import { makeRequest } from "./util";
import { _loginRes, account } from "../types";

/**
 * @returns EcoleDirecte `/v3/login.awp` response
 */
export async function login(
	username: string,
	password: string
): Promise<_loginRes> {
	const body: _loginRes = await makeRequest({
		method: "POST",
		url: "https://api.ecoledirecte.com/v3/login.awp",
		body: {
			identifiant: username,
			motdepasse: password,
			acceptationCharte: true,
		},
	});

	return body;
}

/**
 * @returns The main account of the array
 */
export function getMainAccount(accounts: Array<account>): account {
	const mainAccount = accounts.find(acc => acc.main) || accounts[0] || null;
	return mainAccount;
}
