import { EventEmitter } from "events";
class EventManager extends EventEmitter {}
const logs = new EventManager();
export default logs;
