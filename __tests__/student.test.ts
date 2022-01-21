import { Session } from "../lib";

import { getTestAccount } from "./util";

describe("Student class", () => {
	const { username, password } = getTestAccount("student");
	const session = new Session(username, password);
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("student");
	});

	test("it fetches homework from date", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const someHomework = await acc.getHomework({ dates: "2021-01-14" });
		expect(Array.isArray(someHomework)).toBe(true);
	});

	test("it fetches upcoming homework", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const someHomework = await acc.getHomework();
		expect(Array.isArray(someHomework)).toBe(true);

		const a = someHomework.find(e => !!e.job);
		if (!a || !a.job) return;
		a.job.tick(true);
	});

	test("it fetches messages", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const messages = await acc.getMessages();
		expect(Array.isArray(messages)).toBe(true);

		const message = messages[0];
		expect(await message.getContent()).toBeTruthy();

		expect(message.to).toBeTruthy();
	});

	test("it fetches grades", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const grades = await acc.getGrades();
		expect(Array.isArray(grades)).toBe(true);
	});

	test("it gets periods", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const periods = await acc.getPeriods();
		expect(Array.isArray(periods)).toBe(true);
	});

	test("it fetches timeline", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const timeline = await acc.timeline();
		expect(Array.isArray(timeline)).toBe(true);
	});

	test("it fetches timetable", async () => {
		const acc = await account;
		if (acc.type !== "student") return;

		const timetable = await acc.getTimetable();
		expect(Array.isArray(timetable)).toBe(true);
	});
});
