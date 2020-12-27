import { Session } from "../lib";

describe("Family class", () => {
	const session = new Session("EDFAMILLE", "0");
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("family");
	});
});
