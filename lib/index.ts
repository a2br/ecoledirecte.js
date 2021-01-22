import { Session } from "./Session";
import events from "./events";
import { EcoleDirecteAPIError } from "./errors";

export { Session, events, EcoleDirecteAPIError };
export * from "./account_types";

export default Session;

(async () => {
	const s = new Session("adebierre-spc", "gbUi8y");
	const a = await s.login();
	if (a.type !== "student") return;
	await a.getPhoto();
})();
