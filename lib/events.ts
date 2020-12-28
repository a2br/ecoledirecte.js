import { EventEmitter } from "events";

class LogEvents extends EventEmitter {}
const logs = new LogEvents();
export default logs;
