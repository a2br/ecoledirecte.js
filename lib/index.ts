import * as accounts from "./account_types";
import { Session } from "./Session";
import * as types from "./types";

export { Session, types, accounts };

(async () => {
	const session = new Session("EDPERSONNEL", "0");
	const account = await session.login();
	console.log(account.type);
})();
