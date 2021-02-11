import { failureRes as _failureRes } from "ecoledirecte-api-types";

export class EcoleDirecteAPIError extends Error {
	constructor(public response: _failureRes, message?: string) {
		super(message || `${response.code} | ${response.message}`);
		this.name = "EcoleDirecteAPIError";
	}
}
