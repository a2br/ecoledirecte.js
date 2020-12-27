import { Session } from "../lib";

describe("Staff class", () => {
	const session = new Session("EDPERSONNEL", "0");
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("staff");
	});
});
