#!/usr/bin/env node

import * as fs from "fs";

import * as chalk from "chalk";

const STDIN = 0;
const ANSI_ESCAPE_CODES = /\u001b\[.*?m/g; // https://stackoverflow.com/a/25245824/2135002
const ERROR_SUMMARY = /^([^:]+):(\d+):\d+ - error TS(\d+):/;
const EXPECTED_ERROR_LINE = /^\s*{ void \(\(TS(\d+):/;

type TscOutput = string;

type ErrorDetails = {
	file: string
	line: number
	id: number // e.g. 2344 for TS2344
};

type IndexedLine = {
	lineNumber: number
	lineContent: string
};

main(...process.argv.slice(2));

function main(...testFileNames: string[]) {
	if (testFileNames.length === 0) {
		console.error("No test file(s) specified.");
		process.exit(1);
	}
	check(
		fs.readFileSync(STDIN).toString(),
		testFileNames.map(fileName => ({
			name: fileName,
			source: fs.readFileSync(fileName).toString(),
		})),
	);
}

function check(tscOutput: TscOutput, testFiles: { name: string, source: string }[]) {
	const expectedErrors = testFiles.flatMap(testFile => (
		testFile.source
			.split("\n")
			.map((line, index) => ({
				lineNumber: index + 1,
				lineContent: line,
			}))
			.filter(isIndexedExpectedErrorLine)
			.map(errorDetailsFromIndexedExpectedErrorLine(testFile.name))
	));
	const actualErrors = (
		tscOutput
			.replace(ANSI_ESCAPE_CODES, "")
			.split("\n")
			.filter(isErrorSummaryLine)
			.map(errorDetailsFromSummaryLine)
	);
	const actualButNotExpectedErrors = completenessErrors(expectedErrors, actualErrors);
	const expectedButNotActualErrors = soundnessErrors(expectedErrors, actualErrors);
	if (actualButNotExpectedErrors.concat(expectedButNotActualErrors).length > 0) {
		console.log(tscOutput);
		console.error(`All type errors – expected and unexpected alike – are shown above.`);
		console.error(`Actual problems are listed below.`);
		console.error();
		for (const e of expectedButNotActualErrors) {
			console.error(errorMessage(e.file, e.line, `Expected a TS${e.id} error.`));
		}
		for (const a of actualButNotExpectedErrors) {
			console.error(errorMessage(a.file, a.line, `Unexpected TS${a.id} error.`));
		}
		process.exit(1);
	}
}

function soundnessErrors(
	expectedErrors: ErrorDetails[],
	actualErrors: ErrorDetails[],
): ErrorDetails[] {
	// If the library says that a function is a bijection, then it must actually be one.
	// Ergo, if the function is not actually a bijection, the library must issue a type error.
	return expectedErrors.filter(e => !actualErrors.some(isSameErrorAs(e)));
}

function completenessErrors(
	expectedErrors: ErrorDetails[],
	actualErrors: ErrorDetails[],
): ErrorDetails[] {
	// If a function actually is a bijection, then the library must say that it is one.
	// Ergo, if the library issues a type error, then the function must not be a bijection.
	return actualErrors.filter(a => !expectedErrors.some(isSameErrorAs(a)));
}

function errorMessage(file: string, line: number, message: string): string {
	return `${chalk.cyanBright(file)}:${chalk.yellowBright(line)} - ${message}`;
}

function isSameErrorAs(a: ErrorDetails) {
	return (b: ErrorDetails) => ([ "file", "line", "id" ] as const).every(k => a[k] === b[k]);
}

function isErrorSummaryLine(outputLine: string): boolean {
	return ERROR_SUMMARY.test(outputLine);
}

function errorDetailsFromSummaryLine(summaryLine: string): ErrorDetails {
	const match = summaryLine.match(ERROR_SUMMARY);
	if (match === null) {
		throw new Error(`Could not extract error details from this line: ${summaryLine}`);
	}
	const [ , matchedFile, matchedLine, matchedID ] = match;
	return {
		file: matchedFile,
		line: Number.parseInt(matchedLine),
		id: Number.parseInt(matchedID),
	};
}

function isIndexedExpectedErrorLine(indexedLine: IndexedLine): boolean {
	return EXPECTED_ERROR_LINE.test(indexedLine.lineContent);
}

function errorDetailsFromIndexedExpectedErrorLine(filename: string): (indexedLine: IndexedLine) => ErrorDetails {
	return indexedLine => ({
		file: filename,
		line: indexedLine.lineNumber,
		id: extractExpectedErrorID(indexedLine.lineContent, indexedLine.lineNumber),
	});
}

function extractExpectedErrorID(sourceLine: string, lineNumber: number): number {
	const match = sourceLine.match(EXPECTED_ERROR_LINE);
	if (match === null) {
		throw new Error(`Could not extract expected error ID from line ${lineNumber}: ${sourceLine}`);
	}
	return Number.parseInt(match[1]);
}
