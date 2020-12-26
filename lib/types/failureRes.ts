export type _failureRes = {
	code: number;
	token: string;
	host?: string;
	message: string;
	data?: {
		accounts?: [];
	};
};

export function isFailure(data: any): data is _failureRes {
	try {
		return (
			(!data.token && data.code !== 200) ||
			(data.code === 403 && data.message.includes("votre adresse IP"))
		);
	} catch {
		return true;
	}
}
