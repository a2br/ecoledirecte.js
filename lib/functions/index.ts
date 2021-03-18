export { login, getMainAccount } from "./login";
export { toISODate } from "./util";
export { fetchPhoto } from "./photo";
//! TEXTBOOK

export { getTextbookPage } from "./student/textbook";
export { tickAssignement } from "./student/textbook";

//! MAILBOX

export { getMessages } from "./student/mailbox";

//! NOTES

export { getGrades } from "./student/grades";

//! TIMELINES

export { getTimeline, getCommonTimeline } from "./student/timelines";

//! CLOUD

export * from "./global/cloud";
