import { expandedBase64 } from "./util";
export { expandedBase64 };

import { _failureRes, isFailure } from "./failureRes";
export { isFailure };

//! LOGIN REQ
import { _loginRes, _loginResSuccess, account } from "./login";
import { familyAccount, isFamilyAccount } from "./login";
import { staffAccount, isStaffAccount } from "./login";
import { studentAccount, isStudentAccount } from "./login";
import { teacherAccount, isTeacherAccount } from "./login";

export { _loginRes, _loginResSuccess, account };
export { familyAccount, isFamilyAccount };
export { staffAccount, isStaffAccount };
export { studentAccount, isStudentAccount };
export { teacherAccount, isTeacherAccount };

//! TEXTBOOK

import { _textbookRes, _textbookDateRes } from "./student/textbook";
import {
	_textbookResSuccess,
	_textbookDateResSuccess,
} from "./student/textbook";

import { _textbookDateAssignement, assignement } from "./student/textbook";

export { _textbookRes, _textbookDateRes };
export { _textbookResSuccess, _textbookDateResSuccess };

export { _textbookDateAssignement, assignement };

//! MAILBOX

import { _mailboxRes } from "./student/mailbox";
export { _mailboxRes };
