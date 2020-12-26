import { htmlToText } from "html-to-text";

export function toISODate(date: Date | string | number) {
	const d = new Date(date);
	if (isNaN(d.getTime())) throw new Error("Invalid date");

	return [
		d.getFullYear(),
		(d.getMonth() + 1).toString().padStart(2, "0"),
		d.getDate().toString().padStart(2, "0"),
	].join("-");
}

export function expandBase64(htmlBase64: string) {
	return {
		original: htmlBase64,
		html: Buffer.from(htmlBase64, "base64").toString(),
		text: htmlToText(Buffer.from(htmlBase64, "base64").toString(), {
			wordwrap: false,
		}),
	};
}
