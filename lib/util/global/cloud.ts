import fetch from "node-fetch";

import { Routes, cloudResSuccess } from "ecoledirecte-api-types/v3";
import { makeRequest, USER_AGENT, Config } from "../util";
import { Account } from "../../accounts";

export async function getCloudFolder(
	account: Account,
	folderPath?: string,
	context: Record<string, unknown> = {}
): Promise<cloudResSuccess> {
	const body: cloudResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.cloudFolder(account.__raw.typeCompte, account.edId, {
				verbe: "get",
				idFolder: folderPath || undefined,
			}),
			body: { token: account.token },
			guard: true,
		},
		{ userId: account.edId, action: "getGrades", ...context },
		account
	);

	return body;
}

const EdHeadersFile = {
	authority: "api.ecoledirecte.com",
	// This header, that references a specific version, might cause issues in the future
	"sec-ch-ua":
		// eslint-disable-next-line quotes
		'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
	accept: "application/json, text/plain, */*",
	"sec-ch-ua-mobile": "?0",
	"user-agent": USER_AGENT,
	"content-type": "application/x-www-form-urlencoded",
	origin: "https://www.ecoledirecte.com",
	"sec-fetch-site": "same-site",
	"sec-fetch-mode": "cors",
	"sec-fetch-dest": "empty",
	referer: "https://www.ecoledirecte.com/",
	"accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
};

export async function fetchFile(
	fileId: string,
	token: string
): Promise<[Buffer, string]> {
	//TODO  Bug token usage issues to fix...
	const urlencoded = new URLSearchParams();
	urlencoded.append("data", JSON.stringify({ forceDownload: 0, token: token }));
	const url = new URL(
		Routes.downloadFile({
			verbe: "post",
			fichierId: encodeURI(fileId),
			leTypeDeFichier: "CLOUD",
		}),
		Config.get("root")
	).href;
	const res = await fetch(url, {
		method: "POST",
		headers: EdHeadersFile,
		body: urlencoded,
	});
	const buf = await res.buffer();
	const str =
		"data:" +
		res.headers.get("Content-Type") +
		";base64," +
		buf.toString("base64");
	return [buf, str];
}
