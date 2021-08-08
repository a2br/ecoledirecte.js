import { Session } from "./Session";
import events from "./events";
import { EcoleDirecteAPIError } from "./errors";

export { Session, events, EcoleDirecteAPIError };
export * from "./accounts";
export * from "./classes";
export { Config, FullConfig, PartialConfig, DefaultConfig } from "./util/util";

export default Session;
