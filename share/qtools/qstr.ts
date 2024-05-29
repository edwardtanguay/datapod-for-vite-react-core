import OutlineTextParser from "../../src/classes/outlineTextParser";
import { marked } from "marked";
import * as qstr from "./qstr";

// also does full trim, of array and each line
export const convertStringBlockToLines = (
	stringBlock: string,
	trimLines = true
) => {
	let roughLines: string[] = [];

	if (qstr.isEmpty(stringBlock)) {
		return [];
	}
	roughLines = stringBlock.split("\n");
	if (trimLines) {
		roughLines = qstr.trimAllLinesInLinesArray(roughLines);
	} else {
		// remove at least the ending \r (since not trimming is intended for leaving TABs at the end)
		roughLines = qstr.trimAllLinesOfSlashRInLinesArray(roughLines);
	}
	roughLines = qstr.trimLinesOfEndBlanks(roughLines);
	return roughLines;
};

/**
 * Check if a string is empty.
 *
 * qstr.isEmpty('');
 *
 * true
 */
export const isEmpty = (line: string) => {
	if (line === undefined || line === null) {
		return true;
	}
	line = line.toString();
	return line.trim() === "";
};

export const trimAllLinesOfSlashRInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = qstr.chopRight(line, "\r");
		newLines.push(newLine);
	});
	return newLines;
};

export const trimAllLinesInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = line.trim();
		newLines.push(newLine);
	});
	return newLines;
};

// returns a lines array that has front and end blank strings, as one without these blanks
export const trimLinesOfEndBlanks = (lines: string[]) => {
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	return lines;
};

// if first line of lines array is blank, it will remove it
// but don't remove any blank lines from middle or end
export const trimBeginningLinesOfBlanks = (lines: string[]) => {
	const newLines: string[] = [];
	let trimmingBlanks = true;
	lines.forEach(function (line) {
		const newLine = line;
		if (trimmingBlanks && line === "") {
			// skip it since it is a preceding blank item
		} else {
			newLines.push(newLine);
			trimmingBlanks = false;
		}
	});
	return newLines;
};

// Forces a string to be in title notation, e.g. First Name.
export const forceTitleNotation = (term: string) => {
	let r = term;

	// it is a one-word acronym like "UPS", then just keep it that way
	if (qstr.isAllUppercase(r) && !r.includes(" ")) {
		return r;
	}
	r = term;
	// if at this point we have e.g. "THIS IS A GOOD THING", then lowercase it first here
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	}

	// get the text notation, e.g. "first name"
	const textNotation = qstr.forceTextNotation(r);

	// now uppercase the first letter of each word
	const words = qstr.breakIntoParts(textNotation, " ");

	r = "";
	words.forEach(function (word) {
		r += `${qstr.capitalizeFirstLetter(word).trim()} `;
	});

	r = r.trim();

	// handle the punctuation rules for English, lowercase prepositions and articles under 7 letters
	r = qstr.renderEnglishTitleCapitalization(r);

	return r;
};

/**
 * Capitalize the first letter of a string.
 *
 * qstr.capitalizeFirstLetter("this is a sentence.");
 *
 * "This is a sentence."
 */
export const capitalizeFirstLetter = (line: string) => {
	return line.charAt(0).toUpperCase() + line.slice(1);
};

export const isAllUppercase = (term: string) => {
	if (term.toUpperCase() === term) {
		return true;
	}
	return false;
};

export const forceTextNotation = (term: string) => {
	let r = term;

	r = r.trim();

	// if is all caps like "FIRST ANNUAL REPORT" then we don't want "F I R S T   A N N U A L   R E P O R T"
	// but "first annual report"
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	}
	r = qstr.insertSpaceBeforeEveryUppercaseCharacter(r);

	// now lowercase everything
	r = r.toLowerCase();

	r = r.trim();

	return r;
};

export const insertSpaceBeforeEveryUppercaseCharacter = (term: string) => {
	let r = "";
	const forCheckingTerm = `${term} `;
	for (let i = 0; i < term.length; i += 1) {
		const character = forCheckingTerm.charAt(i);
		// const characterAfter = forCheckingTerm.charAt(i + 1);
		if (qstr.isUppercaseLetter(character)) {
			r += " ";
		}
		r += character;
	}
	r = qstr.forceAllMultipleSpacesToSingleSpace(r);
	return r;
};

export const isUppercaseLetter = (character: string) => {
	const regex = new RegExp("[A-Z]");
	return character.length === 1 && regex.test(character);
};

export const forceAllMultipleSpacesToSingleSpace = (term: string) => {
	return term.replace(/(\s)+/g, " ");
};

export const breakIntoParts = (
	main: string,
	delimiter: string = ",",
	maximumNumberOfParts: number = 0
) => {
	const escapedDelimiter = `\\${delimiter}`;
	const mask = "@@@MASK@@@";
	if (qstr.isEmpty(main)) {
		return [];
	}

	const maskedMain: string = qstr.replaceAll(main, escapedDelimiter, mask);
	const roughParts: string[] = maskedMain.split(delimiter);
	let parts: string[] = [];
	roughParts.forEach((part: string) => {
		let newPart: string = part;
		newPart = newPart.trim();
		parts.push(newPart);
	});
	if (maximumNumberOfParts !== 0 && maximumNumberOfParts < parts.length) {
		const consolidatedParts: string[] = [];
		parts.forEach((part, index) => {
			if (index < maximumNumberOfParts - 1) {
				consolidatedParts.push(part);
			} else {
				const current: string =
					consolidatedParts[maximumNumberOfParts - 1];
				let prefix: string = "";
				if (current !== undefined) {
					prefix = `${current};`;
				}
				consolidatedParts[maximumNumberOfParts - 1] = prefix + part;
			}
		});
		parts = consolidatedParts;
	}

	// unmask
	const unmaskedParts = [];
	for (const part of parts) {
		const unmaskedPart = qstr.replaceAll(part, mask, delimiter);
		unmaskedParts.push(unmaskedPart);
	}
	parts = unmaskedParts;

	return parts;
};

/**
 * REPLACE ALL OCCURANCES IN A STRING:
 *
 * qstr.replaceAll("This is a tost.", "o", "e");
 *
 * "This is a test."
 */
export const replaceAll = (text: string, search: string, replace: string) => {
	return text.split(search).join(replace);
};

export const renderEnglishTitleCapitalization = (term: string) => {
	let r = term;

	const termsToLowercase = [
		"A",
		"An",
		"The",
		"Or",
		"And",
		"Of",
		"For",
		"With",
		"Into",
		"From",
	];

	// mask
	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = `: ${termToLowerCase} `;
		const replaceText = `:@${termToLowerCase}`;
		r = r.replace(searchText, replaceText);
	});

	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = ` ${termToLowerCase} `;
		const replaceText = searchText.toLowerCase();
		r = r.replace(searchText, replaceText);
	});

	// unmask
	termsToLowercase.forEach(function (termToLowerCase) {
		const searchText = `:@${termToLowerCase} `;
		const replaceText = `: ${termToLowerCase} `;
		r = r.replace(searchText, replaceText);
	});
	return r;
};

export const forceCamelNotation = (term: string) => {
	let r = term;

	// specials
	r = r === "ID-Code" ? "id code" : r;

	// first change all e.g. "single-page" to "single page"
	r = qstr.replaceAll(r, "-", " ");

	// if it is all uppercase (e.g. FAQ) then we want all lower case (faq) and not (fAQ)
	if (qstr.isAllUppercase(r)) {
		r = r.toLowerCase();
	} else {
		// get the pascal notation first
		const pascalNotation = qstr.forcePascalNotation(r);

		// now lowercase the first character
		r = qstr.lowercaseFirstLetter(pascalNotation);
	}

	// make sure no spaces are in the string, e.g. "showcaseType Script" --> "showcaseTypeScript"
	r = qstr.replaceAll(r, " ", "");

	return r;
};

export const forcePascalNotation = (term: string) => {
	let r = String(term);

	// exceptions
	if (r.toLowerCase() === "id-code") {
		return "IdCode";
	}

	r = qstr.cleanForCamelAndPascalNotation(r);

	// convert to "First Name"
	r = qstr.forceTitleNotation(r);

	// force EVERY word to be uppercase, as it may be here "Save and Close"
	r = qstr.forceCapitalizeFirstCharacterOfEveryWord(r);

	// now simply take all spaces out
	r = r.replace(" ", "");

	// make sure no spaces are in the string, e.g. "showcaseType Script" --> "showcaseTypeScript"
	r = qstr.replaceAll(r, " ", "");

	return r;
};

export const lowercaseFirstLetter = (term: string) => {
	return term.charAt(0).toLowerCase() + term.slice(1);
};

// "Project 1: The Book Sections" => "Project 1 The Book Sections"
// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const cleanForCamelAndPascalNotation = (term: string) => {
	let r = term;
	r = qstr.convertForeignCharactersToStandardAscii(r);
	r = r.replace(/[^A-Za-z0-9 ]/g, "");
	return r;
};

export const forceCapitalizeFirstCharacterOfEveryWord = (term: string) => {
	let r = "";
	const words = qstr.breakIntoParts(term, " ");
	if (words.length > 0) {
		words.forEach(function (word) {
			r += `${qstr.capitalizeFirstLetter(word)} `;
		});
		r = r.trim();
	}
	return r;
};

// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const convertForeignCharactersToStandardAscii = (term: string) => {
	let r = term;
	// French
	r = r.replace("è", "e");
	r = r.replace("à", "e");
	r = r.replace("ê", "e");
	// todo: add more that you need, with tests

	// German
	r = r.replace("ö", "oe");
	r = r.replace("ß", "ss");
	r = r.replace("ü", "ue");
	r = r.replace("ä", "ae");
	r = r.replace("Ö", "Oe");
	r = r.replace("Ü", "Ue");
	r = r.replace("Ä", "Ae");
	return r;
};

/**
 * Removes text from the end of a string.
 *
 * qstr.chopRight('book-001', '-001');
 *
 * 'book'
 */
export const chopRight = (main: string, textToChop: string) => {
	if (main.endsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(0, mainLen - len);
		}
	}
	return main;
};

export const chopLeft = (main: string, textToChop: string) => {
	if (main.startsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(len, mainLen);
		}
	}
	return main;
};

export const getSingularPluralSyntaxVariations = (
	itemTypeIdCode: string,
	prefix: string = "the"
) => {
	const camelPlural = itemTypeIdCode;
	const camelSingular = qstr.forceSingular(camelPlural);
	return {
		[`${prefix}CamelPlural`]: camelPlural,
		[`${prefix}CamelSingular`]: camelSingular,
		[`${prefix}PascalPlural`]: qstr.forcePascalNotation(camelPlural),
		[`${prefix}PascalSingular`]: qstr.forcePascalNotation(camelSingular),
		[`${prefix}TitlePlural`]: qstr.forceTitleNotation(camelPlural),
		[`${prefix}TitleSingular`]: qstr.forceTitleNotation(camelSingular),
		[`${prefix}TextPlural`]: qstr.forceTextNotation(camelPlural),
		[`${prefix}TextSingular`]: qstr.forceTextNotation(camelSingular),
		[`${prefix}AllcapsSingular`]: camelSingular.toUpperCase(),
		[`${prefix}AllcapsPlural`]: camelPlural.toUpperCase(),
	};
};

// convert quarterReports to quarterReport
export const forceSingular = (potentialPluralNotation: string) => {
	return qstr.chopRight(potentialPluralNotation, "s");
};

// convert quarterReport to quarterReports
export const forcePlural = (potentialSingularNotation: string) => {
	if (!potentialSingularNotation.endsWith("s")) {
		return `${potentialSingularNotation}s`;
	}
	return potentialSingularNotation;
};

export const smartPlural = (
	number: number,
	singularNoun: string,
	pluralNoun: string = ""
) => {
	let r = "";
	if (pluralNoun === "") pluralNoun = singularNoun + "s";
	r += number + " ";
	r += number === 1 ? singularNoun : pluralNoun;
	return r;
};

export const generateShortUUID = () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let shortUUID = "";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		shortUUID += characters.charAt(randomIndex);
	}

	return shortUUID;
};

export const convertToHtml = (text: string) => {
	let r = text;
	r = qstr.replaceAll(r, "\n", "<br/>");
	r = qstr.replaceAll(r, "\t", "&nbsp;&nbsp;");
	return r;
};

export const convertVisibleTabsToSpaces = (text: string) => {
	let r = text;
	r = qstr.replaceAll(r, "\\t", "\t");
	return r;
};

export const convertFromHtml = (text: string) => {
	let r = text;
	r = qstr.replaceAll(r, "\n", "\\n");
	r = qstr.replaceAll(r, "\t", "\\t");
	return r;
};

export const convertLinesToStringBlock = (lines: string[]) => {
	let r = "";
	let index = 0;
	for (const line of lines) {
		r += line;
		if (index != lines.length - 1) {
			r += "\n";
		}
		index++;
	}
	return r;
};

export const wrapAsJsonContent = (innerJsonContent: string) => {
	const lines = qstr.convertStringBlockToLines(innerJsonContent);
	const newLines = [];
	newLines.push("[");
	for (const line of lines) {
		if (line.startsWith("}") || line.startsWith("{")) {
			newLines.push(`\t${line}`);
		} else {
			newLines.push(`\t\t${line}`);
		}
	}
	newLines.push("]");
	return qstr.convertLinesToStringBlock(newLines);
};

export const unescapeText = (text: string): string => {
	let r = text;
	r = qstr.replaceAll(r, "\\n", "\n");
	return r;
};

export const getHostnameFromUrl = (url: string): string => {
	const parsedUrl = new URL(url);
	return parsedUrl.hostname;
};

export const getNumberOfPrecedingTabs = (
	text: string,
	forceRealTabs = false
) => {
	let tempText = text;
	let numberOfPrecedingTabs = 0;
	let tab = qstr.TAB();
	if (forceRealTabs) {
		tab = "\t";
	}
	while (tempText.startsWith(tab)) {
		tempText = qstr.chopLeft(tempText, tab);
		numberOfPrecedingTabs += 1;
	}
	return numberOfPrecedingTabs;
};

export const linesContainCode = (lines: string[]) => {
	let rb = false;
	const codeIdentifyingTexts = [
		"Private Sub",
		"{",
		"}",
		"/&gt;",
		"&lt;/",
		"End Sub",
		"()",
		"CREATE TABLE",
		"Dim ",
		"console.log(",
		"guifont=",
		'print("',
		"window.title",
		"CreateObject",
		"def main()",
	];
	if (qstr.linesContainAnyOfThese(lines, codeIdentifyingTexts)) {
		rb = true;
	}
	if (lines.length === 1 && qstr.endsWith(lines[0], ";")) {
		rb = true;
	}
	return rb;
};

export const addPrecedingTabs = (
	text: string,
	numberOfPrecedingTabs: number
) => {
	const tab = qstr.TAB();
	return tab.repeat(numberOfPrecedingTabs) + text;
};

export const getUrlOutOfString = (line: string) => {
	const regex = /(>https?:\/\/\S+)/;
	const match = line.match(regex);
	let r = match ? match[1] : null;
	r = r ? r : "";
	r = qstr.chopLeft(r, ">");
	const parts = qstr.breakIntoParts(r, "</a>");
	r = parts[0];
	return r;
};

export const shortenUrlText = (url: string) => {
	// https://github.com/edwardtanguay/et002-nextjs-todo-app
	const parts = qstr.breakIntoParts(url, "/");
	const index = parts.length - 1;
	return parts[index];
};

// e.g. - im [intranet](http://intranet/index.php)
export const containsUrlMarkdown = (text: string) => {
	if (
		qstr.contains(text, "(") &&
		qstr.contains(text, ")") &&
		qstr.contains(text, "[") &&
		qstr.contains(text, "]")
	) {
		return true;
	}
	return false;
};

export const parseMarkDown = (
	markdownText: string,
	options = {
		suppressParagraphMarks: false,
		suppressOrderedListElements: false,
	}
) => {
	let r = markdownText;

	// TODO: fix this in order to mask elements, not sure what that was actually
	// if (options.suppressOrderedListElements) {
	// 	r = qstr.maskText(r, '.');
	// }

	r = marked.parse(r);
	if (options.suppressParagraphMarks) {
		r = qstr.chopLeft(r, "<p>");
		r = qstr.chopRight(r, "</p>");
	}

	// make links open up new browser window
	r = qstr.replaceAll(r, "href", 'target="_blank" href');

	// don't hyperlink github links
	r = qstr.replaceAll(
		r,
		'<a href="mailto:git@github.com">git@github.com</a>',
		"git@github.com"
	);

	// if (options.suppressOrderedListElements) {
	// 	r = qstr.unmaskText(r);
	// }

	// was getting </p> a the end of all output that didn't have a \n
	if (!r.startsWith("<p>") && r.endsWith("</p>\n")) {
		r = qstr.chopRight(r, "</p>\n");
	}

	return r;
};

export const TAB = (numberOfTabs: number = 1) => {
	const tab = "    "; // 4 spaces
	return tab.repeat(numberOfTabs);
};

export const linesContainAnyOfThese = function (
	lines: string[],
	codeIdentifyingTexts: string[]
) {
	for (const line of lines) {
		for (const text of codeIdentifyingTexts) {
			if (line.includes(text)) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Check if a string has another string at the end.
 *
 * qstr.contains("This is a test.", ".");
 *
 * true
 */
export const endsWith = (main: string, part: string) => {
	return main.endsWith(part);
};

/**
 * Check if a string is inside another string.
 *
 * qstr.contains("This is a test.", "test");
 *
 * true
 */
export const contains = (line: string, searchText: string) =>
	String(line).includes(searchText);

export const buildOutlineHtml = (body: string) => {
	const lines = qstr.convertStringBlockToLines(body);
	if (qstr.isEmpty(body)) {
		return "";
	} else if (lines.length === 1) {
		const cleanedBody = qstr.chopLeft(body, "- ");
		return (
			'<div class="outline">' + qstr.parseMarkDown(cleanedBody) + "</div>"
		);
	} else {
		const outlineTextParser = new OutlineTextParser(body);
		outlineTextParser.parse();
		let html = outlineTextParser.displayParsed();
		return html;
	}
};

export const encodeHtmlForDisplay = (html: string) => {
	return String(html)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
};

export const formatNumberAsAmericanThousandsCurrency = (currencyValue: number): string => {
	return 'okok';
}