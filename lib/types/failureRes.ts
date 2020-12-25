export type _failureRes = {
	code: number;
	token: "";
	host?: string;
	message: string;
	data?: {
		accounts?: [];
	};
};

export function isFailure(data: any): data is _failureRes {
	try {
		return !data.token && data.code !== 200;
	} catch {
		return true;
	}
}
