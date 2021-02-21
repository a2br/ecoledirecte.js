import { failureRes } from "ecoledirecte-api-types/v3";

export class EcoleDirecteAPIError extends Error {
	constructor(public response: failureRes, message?: string) {
		super(message || `${response.code} | ${response.message}`);
		this.name = "EcoleDirecteAPIError";
	}
}
