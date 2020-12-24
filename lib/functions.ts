import { default as fetch } from "node-fetch";
import {
	account,
	studentAccount,
	teacherAccount,
	familyAccount,
	_loginRes,
	_loginResSuccess,
	_loginResFailure,
	_textbookDateRes,
	_textbookDateResSuccess,
	_textbookDateResFailure,
	_textbookRes,
	staffAccount,
} from "./types";

/**
 * @returns EcoleDirecte `/v3/login.awp` response
 */
export async function login(username: string, password: string) {
	let urlencoded = new URLSearchParams();
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
	let body: _loginRes = await edRes.json();
	return body;
}

/**
 * @returns The main account of the array
 */
export function getMainAccount(accounts: Array<account>) {
	const mainAccount = accounts.find((acc) => acc.main) || accounts[0] || null;
	return mainAccount;
}

/**
 * @param id Account id
 * @param token Auth token
 */
export async function getTextbook(id: number, token: string) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token,
		})
	);

	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte.awp?verbe=get`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _textbookRes = await edRes.json();
	return body;
}

/**
 * @param id Account id
 * @param token Auth token
 * @param date Date of the textbook page (YYYY-MM-DD)
 */
export async function getTextbookPage(id: number, token: string, date: string) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token,
		})
	);
	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/Eleves/${id}/cahierdetexte/${date}.awp?verbe=get`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _textbookDateRes = await edRes.json();
	return body;
}

//! TYPE GUARDS

//? LOGIN

/**
 * @returns Whether the given response is successful
 */
export function loginSucceeded(
	loginRes: _loginRes
): loginRes is _loginResSuccess {
	return "data" in loginRes && loginRes.code == 200;
}

/**
 * @returns Whether the given response is a failure
 */
export function loginFailed(loginRes: _loginRes): loginRes is _loginResFailure {
	return !loginSucceeded(loginRes);
}

/**
 * @returns Whether `account` is `studentAccount`
 */
export function isStudentAccount(account: account): account is studentAccount {
	return account.typeCompte === "E";
}

/**
 * @returns Whether `account` is `teacherAccount`
 */
export function isTeacherAccount(account: account): account is teacherAccount {
	return account.typeCompte === "P";
}

/**
 * @returns Whether `account` is `familyAccount`
 */
export function isFamilyAccount(account: account): account is familyAccount {
	return account.typeCompte === "1";
}

/**
 * @returns Whether `account` is `staffAccount`
 */
export function isStaffAccount(account: account): account is staffAccount {
	return account.typeCompte === "A";
}

//? TEXTBOOK DATE

/**
 * @returns Whether the given response is a success
 */
export function textbookDateSucceeded(
	textbookDateRes: _textbookDateRes
): textbookDateRes is _textbookDateResSuccess {
	return textbookDateRes.code === 200 && !!textbookDateRes.token;
}

/**
 * @returns Whether the given response is a failure
 */
export function textbookDateFailed(
	textbookDateRes: _textbookDateRes
): textbookDateRes is _textbookDateResFailure {
	return textbookDateRes.code !== 200 && !textbookDateRes.token;
}
