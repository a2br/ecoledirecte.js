import fetch from "node-fetch";
import { Account } from "../accounts";

const EdHeadersPhoto = {
	Referer: "https://www.ecoledirecte.com/",
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
};
export async function fetchPhoto(
	account: Account
): Promise<[Buffer, string] | undefined> {
	if (!(account.__raw.profile as Record<string, unknown>).photo) return;
	const res = await fetch(
		"https:" + (account.__raw.profile as Record<string, unknown>).photo,
		{
			method: "GET",
			headers: EdHeadersPhoto,
			redirect: "follow",
		}
	).catch(() => undefined);
	if (!res) return;
	const token = res.headers.get("x-token");
	if (token) account.token = token;
	const buf = await res.buffer();
	const str =
		"data:" +
		res.headers.get("Content-Type") +
		";base64," +
		buf.toString("base64");
	return [buf, str];
}
