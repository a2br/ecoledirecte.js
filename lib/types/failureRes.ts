export type _failureRes = {
	code: number;
	token: string;
	host?: string;
	message: string;
	data?: {
		accounts?: [];
	};
};
export function isFailure(data: Record<string, unknown>): data is _failureRes {
	try {
		const usualError = !data.token && data.code !== 200;
		const blockError =
			typeof data.message === "string"
				? data.code === 403 &&
				  (data as { message: string }).message.includes("votre adresse IP")
				: false;
		const error = usualError || blockError;
		return error;
	} catch {
		return true;
	}
}
