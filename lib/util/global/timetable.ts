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

	for (let i = 0; i < dates.length; i++) {
		if (!(dates[i] instanceof Date)) {
			try {
				dates[i] = new Date(dates[i]);
			} catch (e) {
				throw new Error(
					`Invalid date: ${dates[i]} (expected Date, string or number)`
				);
			}
		}
	}

	if (!dates[1]) {
		dates[1] = dates[0];
	}

	const startDate = toISODate(dates[0]);
	const endDate = toISODate(dates[1]);

	const body: timetableResSuccess = await makeRequest(
		{
			method: "POST",
			path: Routes.timetable(account.__raw.typeCompte, account.edId),
			body: {
				token: account.token,
				dateDebut: startDate,
				dateFin: endDate,
			},
			guard: true,
		},
		{ userId: account.edId, action: "getTimetable", ...context }
	);

	return body;
}
