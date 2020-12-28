import { EventEmitter } from "events";
class EventsManager extends EventEmitter {}
const logs = new EventsManager();
export default logs;
