import { Session } from "../lib";

describe("Student class", () => {
	const session = new Session("EDELEVE", "0");
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("student");
	});

	test("it fetches homework from date", async () => {
		const acc = await account;
		if (acc.type !== "student") return;
		const someHomework = await acc.getHomework("2021-01-14");
		expect(Array.isArray(someHomework)).toBe(true);
	});

	test("it fetches upcoming homework", async () => {
		const acc = await account;
		if (acc.type !== "student") return;
		const someHomework = await acc.getHomework();
		expect(Array.isArray(someHomework)).toBe(true);
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
});
