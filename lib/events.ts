import { EventEmitter } from "events";
class Events extends EventEmitter {
	constructor(options: Record<string, unknown> = {}) {
		super();
	}
}
const logs = new EventEmitter();
export default logs;
