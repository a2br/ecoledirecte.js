import { root, Routes, role, cloudResSuccess } from "ecoledirecte-api-types/v3";
import { makeRequest } from "../util";

export async function getCloudFolder(
	accountType: role,
	id: number,
	token: string,
	folderPath?: string,
	context: Record<string, unknown> = {}
): Promise<cloudResSuccess> {
	const body: cloudResSuccess = await makeRequest(
		{
			method: "POST",
			url: new URL(
				Routes.cloudFolder(accountType, id, {
					verbe: "get",
					idFolder: folderPath || undefined,
				}),
				root
			).href,
			body: { token },
			guard: true,
		},
		{ userId: id, action: "getGrades", ...context }
	);

	return body;
}
