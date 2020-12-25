import * as fs from "fs";
import * as path from "path";

import { _loginRes, isFailure } from "../lib/types";

const getDirectories = (srcPath: string) =>
	fs
		.readdirSync(srcPath)
		.filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());

const readJSONFile = (path: string) =>
	JSON.parse(fs.readFileSync(path).toString());

const responses = getDirectories("__tests__/responses").map((dirName) => {
	const path = `__tests__/responses/${dirName}`;

	const map: {
		name: string;
		success: _loginRes[];
		failure: _loginRes[];
	} = {
		name: dirName,
		success: readJSONFile(`${path}/success.json`),
		failure: readJSONFile(`${path}/failure.json`),
	};

	return map;
});

responses.forEach((resType) => {
	test(resType.name, () => {
		resType.success.forEach((res) => expect(isFailure(res)).toBe(false));
		resType.failure.forEach((res) => expect(isFailure(res)).toBe(true));
	});
});

// test("login", () => {
// 	//! SUCCESS
// 	successLogin.forEach((res) => {
// 		const judgement = isFailure(res);
// 		expect(judgement).toBe(false);
// 	});
// 	//! FAILURE
// 	failureLogin.forEach((res) => {
// 		const judgement = isFailure(res);
// 		expect(judgement).toBe(true);
// 	});
// });
