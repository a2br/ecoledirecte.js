import { login, getMainAccount } from "./login";
import { toISODate, expandBase64 } from "./util";

export { login, getMainAccount };
export { toISODate, expandBase64 };

//! TEXTBOOK

import { getTextbookPage } from "./student/textbook";
import { cleanAssignements } from "./student/textbook";

export { getTextbookPage, cleanAssignements };

//! MAILBOX

import { getMessages } from "./student/mailbox";

export { getMessages };
