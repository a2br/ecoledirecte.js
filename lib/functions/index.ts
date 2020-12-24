import { default as fetch } from "node-fetch";
import {
	account,
	studentAccount,
	teacherAccount,
	familyAccount,
	_failureRes,
	_loginRes,
	_loginResSuccess,
	_textbookDateRes,
	_textbookDateResSuccess,
	_textbookRes,
	staffAccount,
	_mailboxRes,
} from "../types";

//! FUNCTIONS

//? LOGIN
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

//? TEXTBOOK

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

//? MAILBOX

export async function getMessages(
	id: number,
	token: string,
	direction: "received" | "sent" = "received"
) {
	let urlencoded = new URLSearchParams();
	urlencoded.append(
		"data",
		JSON.stringify({
			token: token,
		})
	);
	let edRes = await fetch(
		`https://api.ecoledirecte.com/v3/eleves/${id}/messages.awp?verbe=getall&typeRecuperation=${direction}&orderBy=date&order=desc&page=0&itemsPerPage=100&onlyRead=&query=&idClasseur=0`,
		{
			method: "POST",
			body: urlencoded,
		}
	);
	let body: _mailboxRes = await edRes.json();
	return body;
}

//! TYPE GUARDS

export function isFailure(data: any): data is _failureRes {
	try {
		return (
			!data.token && data.code !== 200 && (!data.data || !data.data.accounts)
		);
	} catch {
		return true;
	}
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
