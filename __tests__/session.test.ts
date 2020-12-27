import { Session } from "../lib";

describe("Session class", () => {
	const session = new Session("EDELEVE", "0");
	const account = session.login();

	test("it returns correct credentials", () => {
		expect(JSON.stringify(session.credentials)).toBe(
			JSON.stringify({
				username: "EDELEVE",
				password: "0",
			})
		);
	});

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("student");
	});

	test("it properly handles errors", async () => {
		const errSession = new Session("EDELEVE", "1");
		let didThrowError = false;
		await errSession
			.login()
			.catch(() => {
				didThrowError = true;
			})
			.then(() => {
				expect(didThrowError).toBe(true);
			});
	});

	test("it fetches homework", async () => {
		const acc = await account;
		if (acc.type !== "student") return;
		const someHomework = await acc.getHomework("2021-01-14");
		expect(Array.isArray(someHomework)).toBe(true);
	});
});
