# ecoledirecte.js

Browse EcoleDirecte's private API with the module of your dreams.

`ed.js` is a Promise-based module, built on TypeScript for a better IntelliSense and type-guarded, solid features. It keeps evolving and new features are being added.

### Example

Here's a quick example on how to get the homework of a day.

```javascript
// Import 'Session' class from ed.js
import { Session } from "ecoledirecte.js";

// Create a new Session. Currently inert
const session = new Session("EDELEVE", "0");

// Bringing your session to life! Make sure to wrap this
// in try {} catch {} in your code.
const account = await session.login();

// Gets the homwork due for a specific date as a simplified
// array. To get the original response from ED, there's still
// a _raw prop.
const homework = await account.getHomework("2021-01-14");

// Some strings are available in their original shape
// (base64), in HTML and as simple text.
console.log(homework[2].contenuDeSeance.contenu.text);
```
