import * as accounts from "./account_types";
import { Session } from "./Session";

export { Session, accounts };

(async () => {
	const session = new Session("EDELEVE", "a");
	const account = await session.login();
	if (account.type !== "student") return;

	console.log(
		(await account.getHomework("2021-01-14"))[2].contenuDeSeance.contenu
	);
})();
