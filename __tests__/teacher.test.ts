import { Session } from "../lib";

describe("Teacher class", () => {
	const session = new Session("EDPROF", "0");
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("teacher");
	});
});
