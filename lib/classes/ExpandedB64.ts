import { htmlToText } from "html-to-text";

export class ExpandedBase64 {
	readonly original: string;
	readonly html: string;
	readonly text: string;
	constructor(htmlBase64: string) {
		this.original = htmlBase64;
		this.html = Buffer.from(htmlBase64, "base64").toString();
		this.text = htmlToText(this.html, {
			wordwrap: false,
		});
	}
}
