# ecoledirecte.js &middot; ![GitHub](https://img.shields.io/github/license/a2br/ecoledirecte.js) ![npm](https://img.shields.io/npm/v/ecoledirecte.js) ![npm](https://img.shields.io/npm/dw/ecoledirecte.js)

Browse EcoleDirecte's private API with the module of your dreams. But first, [read the docs](https://edjs.gitbook.io/).

`ed.js` is a Promise-based module, built on TypeScript for a better IntelliSense and type-guarded, solid features. It keeps evolving and new features are being added. This is the most complete EcoleDirecte client you'll find at that time. After the website itself, of course.

## Examples

### Get the homework of a day

```javascript
import { Session } from "ecoledirecte.js";

// Create a new Session.
const session = new Session("EDELEVE", "0)";

// Bring your session to life!
const account = await session.login().catch(err => {
	console.error("This login did not go well.");
});

// Is is a student account?
if (!account || account.type !== "student") throw new Error("Not a student!");

// Get the homework due for a specific date as a simplified array
const homework = await account.getHomework({ dates: "2021-01-14" });

// Every piece of data from the API is reformated  (eg: base64 string are
// converted to text/HTML). The raw data remains always available as _raw
console.log(homework[2].contenuDeSeance.content.text);
```

### Introduction to events

Events can be used to do something when something else happens, in real-time. (very specific, as you can tell)
As an example, the following will log the method and the url each time `ed.js` sends a request to the EcoleDirecte servers.

```javascript
import { events } from "ecoledirecte.js";

events.on("request", ({ method, url }) => console.log(method, url));
// POST https://api.ecoledirecte.com/v3/login.awp
// POST https://api.ecoledirecte.com/v3/eleves/4179/timeline.awp
// ...
```

## Dependencies walkthrough

| Dependency                                                                     | Description                                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [node-fetch](https://www.npmjs.com/package/node-fetch)                         | A light-weight module that brings window.fetch to Node.js                                         |
| [html-to-text](https://www.npmjs.com/package/html-to-text)                     | Converter that parses HTML and returns text.                                                      |
| [ecoledirecte-api-types](https://www.npmjs.com/package/ecoledirecte-api-types) | Module that maps the routes and types related to EcoleDirecte's API. Originally a part of `ed.js` |
