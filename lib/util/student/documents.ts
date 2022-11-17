import { Routes } from "ecoledirecte-api-types/v3";
import { studentDocsResSuccess } from "ecoledirecte-api-types/v3";

import { makeRequest } from "../util";

export async function getDocuments(
	token: string,
	archiveYear?: string
): Promise<studentDocsResSuccess> {
	const body: studentDocsResSuccess = await makeRequest({
		method: "POST",
		path: Routes.studentDocuments({ archive: archiveYear ?? "" }),
		body: { token },
		guard: true,
	});

	return body;
}

export async function downloadDocument(
	token: string,
	documentId: number,
	fileType?: string,
	archiveYear?: string
): Promise<Blob> {
	const body: Blob = await makeRequest(
		{
			method: "GET",
			path: Routes.downloadDocument({
				fichierId: documentId,
				leTypeDeFichier: fileType || "",
				archive: !!archiveYear,
				anneeArchive: archiveYear || "",
			}),
			body: {
				forceDownload: 0,
				archivve: !!archiveYear,
				anneeArchive: archiveYear || "",
			},
			guard: true,
			expectBuffer: true,
		},
		undefined,
		undefined,
		token
	);

	return body;
}
