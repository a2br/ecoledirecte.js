import { EventEmitter } from "events";
class EventManager extends EventEmitter {}
/**
 * Important note: the profile picture requests don't trigger the event manager
 */
const events = new EventManager();
export default events;
