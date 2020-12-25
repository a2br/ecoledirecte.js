import { Session } from "../lib";

const session = new Session("EDELEVE", "0");
const account = session.login();

test("credentials", () => {
	expect(JSON.stringify(session.credentials)).toBe(
		JSON.stringify({
			username: "EDELEVE",
			password: "0",
		})
	);
});

test("account", async () => {
	const acc = await account;
	expect(acc.type).toBe("student");
});

test("homework", async () => {
	const acc = await account;

	if (acc.type !== "student") return;
	const someHomework = await acc.getHomework("2021-01-14");
	expect(Array.isArray(someHomework)).toBe(true);
});
