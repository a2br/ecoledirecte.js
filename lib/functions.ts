import { default as fetch } from "node-fetch";
import {
	account,
	studentAccount,
	loginRes,
	successLoginRes,
	failLoginRes,
} from "./types";

/**
 * @returns EcoleDirecte `/v3/login.awp` response
 */
export async function login(username: string, password: string) {
	var urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			identifiant: username,
			motdepasse: password,
			acceptationCharte: true,
		})
	);

	let edRes = await fetch("https://api.ecoledirecte.com/v3/login.awp", {
		method: "POST",
		body: urlencoded,
	});
	let body: loginRes = await edRes.json();
	return body;
}

/**
 * @returns The main account of the array
 */
export function getMainAccount(accounts: Array<account>) {
	const mainAccount = accounts.find((acc) => acc.main) || accounts[0] || null;
	return mainAccount;
}

//! TYPE GUARDS

/**
 * @returns Whether the given response is successful
 */
export function loginSucceeded(
	loginRes: loginRes
): loginRes is successLoginRes {
	return "data" in loginRes && loginRes.code == 200;
}

/**
 * @returns Whether the given response is a failure
 */
export function loginFailed(loginRes: loginRes): loginRes is failLoginRes {
	return !loginSucceeded(loginRes);
}

/**
 * @returns Whether `account` is `studentAccount`
 */
export function isStudentAccount(account: account): account is studentAccount {
	return account.typeCompte === "E";
}
