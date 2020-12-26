export function toISODate(date: Date | string | number) {
	const d = new Date(date);
	if (isNaN(d.getTime())) throw new Error("Invalid date");

	return [
		d.getFullYear(),
		(d.getMonth() + 1).toString().padStart(2),
		d.getDate().toString().padStart(2),
	].join("-");
}
