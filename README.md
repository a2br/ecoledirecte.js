# ecoledirecte.js

Browse EcoleDirecte's private API with the module of your dreams.

`ed.js` is a Promise-based module, built on TypeScript for a better IntelliSense and type-guarded, solid features. It keeps evolving and new features are being added.

### Example

Here's a quick example on how to get the homework of a day.

```javascript
// Import 'Session' class from ed.js
import { Session } from "ecoledirecte.js";

async function getHomework(username, password, date) {
	// Create a new Session. As long as it doesn't
	// log in, it's inert.
	const session = new Session(username, password);

	// Bringing your session to life! Make sure to wrap this
	// in try {} catch {} in your code.
	const account = await session.login();

	// We should check that the user is a student: otherwise,
	// we wouldn't be able to get the homework.
	if (!(account instanceof accounts.Student)) return;
	// This works too:
	if (account.type !== "student") return;

	// Get the homework due for a specific date as a simplified
	// array. If you need more, you can get the original
	// response from ED in the _raw prop of each elem.
	const homework = await account.getHomework(date);

	// Some large strings are available in their original shape
	// (base64), in HTML and as simple text.
	console.log(homework[2].contenuDeSeance.contenu.text);

	// Returning the array of homework!
	return homework;
}

getHomework("EDELEVE", "0", "2021-01-14");
```
