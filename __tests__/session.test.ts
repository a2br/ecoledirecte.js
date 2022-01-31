import { Session } from "../lib";

import { getTestAccount } from "./util";

describe("Session class", () => {
	const { username, password } = getTestAccount("student");
	const session = new Session(username, password);
	const account = session.login();

	test("it returns correct credentials", () => {
		expect(JSON.stringify(session.credentials)).toBe(
			JSON.stringify({
				username: username,
				password: password,
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
});
