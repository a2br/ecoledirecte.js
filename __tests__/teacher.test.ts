import { Session } from "../lib";

import { getTestAccount } from "./util";

describe("Teacher class", () => {
	const { username, password } = getTestAccount("teacher");
	const session = new Session(username, password);
	const account = session.login();

	test("it successfully connects", async () => {
		const acc = await account;
		expect(acc.type).toBe("teacher");
	});
});
