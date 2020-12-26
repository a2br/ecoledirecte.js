import * as accounts from "./account_types";
import { Session } from "./Session";

export { Session, accounts };
export default Session;
(async () => {
	const s = new Session("EDELEVE", "0");
	const a = await s.login().catch(console.log);
	if (!a || a.type !== "student") return;

	const messages = await a.getMessages();
	console.log(messages[0]);
})();
