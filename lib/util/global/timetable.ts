import { Routes, timetableResSuccess } from "ecoledirecte-api-types/v3";
import { makeRequest, toISODate } from "../util";
import { Student } from "../../accounts/";

export async function getTimetable(
	account: Student,
	dates: Array<Date | string | number> | (Date | string | number) = Date.now(),
	context: Record<string, unknown> = {}
): Promise<timetableResSuccess> {
	if (!account.hasModule("EDT")) {
		throw new Error("Account does not have timetable enabled");
	}

	if (!Array.isArray(dates)) dates = [dates];
	if (!dates[1]) dates[1] = dates[0];

	const startDate = new Date(dates[0]);
	const endDate = new Date(dates[1]);

	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
		throw new Error("Invalid dates");
	}

	if (startDate > endDate) throw new Error("Start date is after end date");

	const body: timetableResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.timetable(account.__raw.typeCompte, account.edId),
			body: {
				token: account.token,
				dateDebut: toISODate(startDate),
				dateFin: toISODate(endDate),
			},
			guard: true,
		},
		{ userId: account.edId, action: "getTimetable", ...context }
	);

	return body;
}
