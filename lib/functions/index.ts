import { login, getMainAccount } from "./login";
import { toISODate } from "./util";

export { login, getMainAccount };
export { toISODate };

//! TEXTBOOK

import { getTextbook, getTextbookPage } from "./student/textbook";
import { cleanAssignements } from "./student/textbook";

export { getTextbook, getTextbookPage, cleanAssignements };

//! MAILBOX

import { getMessages } from "./student/mailbox";

export { getMessages };
