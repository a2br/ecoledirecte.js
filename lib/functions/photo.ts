import fetch from "node-fetch";
import {
	studentAccount,
	teacherAccount,
	staffAccount,
} from "ecoledirecte-api-types";
// import { EdHeaders } from "./util";

const EdHeadersPhoto = {
	Referer: "https://www.ecoledirecte.com/",
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
};
export async function fetchPhoto(
	account: studentAccount | teacherAccount | staffAccount
): Promise<Buffer | undefined> {
	if (!account.profile.photo) return;
	const res = await fetch("https:" + account.profile.photo, {
		method: "GET",
		headers: EdHeadersPhoto,
		redirect: "follow",
	}).catch(() => undefined);
	if (!res) return undefined;
	const buf = await res.buffer();
	// const strPrefix = "data:" + res.headers.get("Content-Type") + ";base64,";
	// const str = strPrefix + buf.toString();
	return buf;
}
