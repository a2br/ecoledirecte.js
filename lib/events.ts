import { EventEmitter } from "events";

// interface LogEvents {
// 	request: { method: string; url: string; body: Record<string, unknown> };
// }

class LogEmitter extends EventEmitter {}
const logs = new LogEmitter();
export default logs;
