import { root, Routes } from "ecoledirecte-api-types";
import { expandBase64, makeRequest } from "../util";
import {
	_studentCommonTlResSuccess,
	_studentTlResSuccess,
	studTlElem,
	studTlEvent,
} from "../../types";

export async function getTimeline(
	id: number,
	token: string
): Promise<_studentTlResSuccess> {
	const body: _studentTlResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.studentTimeline(id), root).href,
		body: { token },
		guard: true,
	});

	return body;
}

export async function getCommonTimeline(
	id: number,
	token: string
): Promise<_studentCommonTlResSuccess> {
	const body: _studentCommonTlResSuccess = await makeRequest({
		method: "POST",
		url: new URL(Routes.commonTimeline("E", id), root).href,
		body: { token },
		guard: true,
	});

	return body;
}

export function cleanStudTimeline(
	timelineRes: _studentTlResSuccess
): studTlElem[] {
	const timeline: studTlElem[] =
		"data" in timelineRes
			? timelineRes.data.map(e => ({
					date: new Date(e.date),
					type: e.typeElement,
					id: e.idElement,
					title: e.titre,
					subtitle: e.soustitre,
					content: e.contenu,
					_raw: e,
			  }))
			: [];

	return timeline;
}

export function cleanStudTlEvents(
	commonTimelineRes: _studentCommonTlResSuccess
): studTlEvent[] {
	const events: studTlEvent[] = commonTimelineRes.data.evenements.map(e => ({
		id: e.id,
		title: e.libelle,
		description: expandBase64(e.description),
		start: new Date(e.dateDebut + " " + (e.heureDebut || "")),
		end: new Date(e.dateFin + " " + (e.heureFin || "")),
		cibles: e.cibles,
		_raw: e,
	}));

	return events;
}
