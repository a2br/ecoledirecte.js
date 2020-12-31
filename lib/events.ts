import { EventEmitter } from "events";
class EventManager extends EventEmitter {}
const events = new EventManager();
export default events;
