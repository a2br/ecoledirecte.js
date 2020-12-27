# ecoledirecte.js &middot; ![GitHub](https://img.shields.io/github/license/a2br/ecoledirecte.js) ![npm](https://img.shields.io/npm/v/ecoledirecte.js) ![npm](https://img.shields.io/npm/dw/ecoledirecte.js)

Browse EcoleDirecte's private API with the module of your dreams. But first, [read the docs](https://edjs.gitbook.io/).

`ed.js` is a Promise-based module, built on TypeScript for a better IntelliSense and type-guarded, solid features. It keeps evolving and new features are being added.

### Example

Here's a quick example on how to get the homework of a day.

```javascript
import { Session } from "ecoledirecte.js";

// Create a new Session. As long as it doesn't
// log in, it's inert.
const session = new Session(username, password);

// Bringing your session to life!
const account = await session.login().catch(err => {
	console.error("The login did not go well.");
});

// We should check that the user exists (in case the login
// failed) and is a student: otherwise, we wouldn't be
// able to get the homework.
if (!account || account.type !== "student") throw new Error("Not a student");

// Get the homework due for a specific date as a simplified
// array. If you need more, you can get the original
// response from ED in the _raw prop of each elem.
// Providing no arguments will automatically select all the
// upcoming homework
const homework = await account.getHomework("2021-01-14");

// Some large strings are available in their original shape
// (base64), in HTML and as simple text.
console.log(homework[2].contenuDeSeance.content.text);
```
