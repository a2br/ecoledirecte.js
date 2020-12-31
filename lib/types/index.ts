export { expandedBase64 } from "./util";

export { isFailure } from "./failureRes";

//! LOGIN REQ

export { _loginRes, _loginResSuccess, account } from "./login";
export { familyAccount, isFamilyAccount } from "./login";
export { staffAccount, isStaffAccount } from "./login";
export { studentAccount, isStudentAccount } from "./login";
export { teacherAccount, isTeacherAccount } from "./login";

//! TEXTBOOK

export { _textbookRes, _textbookDateRes } from "./student/textbook";
export {
	_textbookResSuccess,
	_textbookDateResSuccess,
} from "./student/textbook";

export { _textbookDateAssignement, assignement } from "./student/textbook";

//! MAILBOX

export * from "./student/mailbox";

//! REPORT CARD

export * from "./student/notes";

//! TIMELINES

export * from "./student/timelines";
