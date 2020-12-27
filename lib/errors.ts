import { _failureRes } from "./types/failureRes";

export class EcoleDirecteAPIError extends Error {
	constructor(public response: _failureRes, message?: string) {
		super(message || `${response.code} | ${response.message}`);
		this.name = "EcoleDirecteAPIError";
	}
}
