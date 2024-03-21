import * as qstr from './qstr';

// also does full trim, of array and each line
export const convertStringBlockToLines = (stringBlock: string, trimLines = true) => {
	let roughLines: string[] = [];

	if (qstr.isEmpty(stringBlock)) {
		return [];
	}
	roughLines = stringBlock.split('\n');
	if (trimLines) {
		roughLines = qstr.trimAllLinesInLinesArray(roughLines);
	}
	roughLines = qstr.trimLinesOfEndBlanks(roughLines);
	return roughLines;
}

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
	return line.trim() === '';
}

export const trimAllLinesInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = line.trim();
		newLines.push(newLine);
	});
	return newLines;
}

// returns a lines array that has front and end blank strings, as one without these blanks
export const trimLinesOfEndBlanks = (lines: string[]) => {
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	return lines;
}

// if first line of lines array is blank, it will remove it
// but don't remove any blank lines from middle or end
export const trimBeginningLinesOfBlanks = (lines: string[]) => {
	const newLines: string[] = [];
	let trimmingBlanks = true;
	lines.forEach(function (line) {
		const newLine = line;
		if (trimmingBlanks && line === '') {
			// skip it since it is a preceding blank item
		} else {
			newLines.push(newLine);
			trimmingBlanks = false;
		}
	});
	return newLines;
}

// Forces a string to be in title notation, e.g. First Name.
export const forceTitleNotation = (term: string) => {
	let r = term;

	// it is a one-word acronym like "UPS", then just keep it that way
	if (qstr.isAllUppercase(r) && !r.includes(' ')) {
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
	const words = qstr.breakIntoParts(textNotation, ' ');

	r = '';
	words.forEach(function (word) {
		r += `${qstr.capitalizeFirstLetter(word).trim()} `;
	});

	r = r.trim();

	// handle the punctuation rules for English, lowercase prepositions and articles under 7 letters
	r = qstr.renderEnglishTitleCapitalization(r);

	return r;
}


/**
 * Capitalize the first letter of a string.
 *
 * qstr.capitalizeFirstLetter("this is a sentence.");
 *
 * "This is a sentence."
 */
export const capitalizeFirstLetter = (line: string) => {
	return line.charAt(0).toUpperCase() + line.slice(1);
}


export const isAllUppercase = (term: string) => {
	if (term.toUpperCase() === term) {
		return true;
	}
	return false;
}

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
}

export const insertSpaceBeforeEveryUppercaseCharacter = (term: string) => {
	let r = '';
	const forCheckingTerm = `${term} `;
	for (let i = 0; i < term.length; i += 1) {
		const character = forCheckingTerm.charAt(i);
		// const characterAfter = forCheckingTerm.charAt(i + 1);
		if (qstr.isUppercaseLetter(character)) {
			r += ' ';
		}
		r += character;
	}
	r = qstr.forceAllMultipleSpacesToSingleSpace(r);
	return r;
}

export const isUppercaseLetter = (character: string) => {
	const regex = new RegExp('[A-Z]');
	return character.length === 1 && regex.test(character);
}

export const forceAllMultipleSpacesToSingleSpace = (term: string) => {
	return term.replace(/(\s)+/g, ' ');
}

export const breakIntoParts = (main: string, delimiter: string = ',', maximumNumberOfParts: number = 0) => {
	const escapedDelimiter = `\\${delimiter}`;
	const mask = '@@@MASK@@@';
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
				const current: string = consolidatedParts[maximumNumberOfParts - 1];
				let prefix: string = '';
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
}

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

	const termsToLowercase = ['A', 'An', 'The', 'Or', 'And', 'Of', 'For', 'With', 'Into', 'From'];

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
}

export const forceCamelNotation = (term: string) => {
	let r = term;

	// specials
	r = r === 'ID-Code' ? 'id code' : r;

	// first change all e.g. "single-page" to "single page"
	r = qstr.replaceAll(r, '-', ' ');

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
	r = qstr.replaceAll(r, ' ', '');

	return r;
}

export const forcePascalNotation = (term: string) => {
	let r = String(term);

	// exceptions
	if (r.toLowerCase() === 'id-code') {
		return 'IdCode';
	}

	r = qstr.cleanForCamelAndPascalNotation(r);

	// convert to "First Name"
	r = qstr.forceTitleNotation(r);

	// force EVERY word to be uppercase, as it may be here "Save and Close"
	r = qstr.forceCapitalizeFirstCharacterOfEveryWord(r);

	// now simply take all spaces out
	r = r.replace(' ', '');

	// make sure no spaces are in the string, e.g. "showcaseType Script" --> "showcaseTypeScript"
	r = qstr.replaceAll(r, ' ', '');

	return r;
}

export const lowercaseFirstLetter = (term: string) => {
	return term.charAt(0).toLowerCase() + term.slice(1);
}

// "Project 1: The Book Sections" => "Project 1 The Book Sections"
// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const cleanForCamelAndPascalNotation = (term: string) => {
	let r = term;
	r = qstr.convertForeignCharactersToStandardAscii(r);
	r = r.replace(/[^A-Za-z0-9 ]/g, '');
	return r;
}

export const forceCapitalizeFirstCharacterOfEveryWord = (term: string) => {
	let r = '';
	const words = qstr.breakIntoParts(term, ' ');
	if (words.length > 0) {
		words.forEach(function (word) {
			r += `${qstr.capitalizeFirstLetter(word)} `;
		});
		r = r.trim();
	}
	return r;
}

// "Die fröhliche Wissenschaft" => "Die froehliche Wissenschaft"
export const convertForeignCharactersToStandardAscii = (term: string) => {
	let r = term;
	// French
	r = r.replace('è', 'e');
	r = r.replace('à', 'e');
	r = r.replace('ê', 'e');
	// todo: add more that you need, with tests

	// German
	r = r.replace('ö', 'oe');
	r = r.replace('ß', 'ss');
	r = r.replace('ü', 'ue');
	r = r.replace('ä', 'ae');
	r = r.replace('Ö', 'Oe');
	r = r.replace('Ü', 'Ue');
	r = r.replace('Ä', 'Ae');
	return r;
}

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
			return main.substring(0, mainLen - (len));
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

export const getSingularPluralSyntaxVariations = (itemTypeIdCode: string, prefix: string = 'the') => {
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
	}
}


// convert quarterReports to quarterReport
export const forceSingular = (potentialPluralNotation: string) => {
	return qstr.chopRight(potentialPluralNotation, 's');
}

// convert quarterReport to quarterReports
export const forcePlural = (potentialSingularNotation: string) => {
	if (!potentialSingularNotation.endsWith('s')) {
		return `${potentialSingularNotation}s`;
	}
	return potentialSingularNotation;
}

export const smartPlural = (number: number, singularNoun: string, pluralNoun: string = '') => {
	let r = '';
	if (pluralNoun === '') pluralNoun = singularNoun + 's';
	r += number + ' ';
	r += number === 1 ? singularNoun : pluralNoun;
	return r;
}

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
	r = qstr.replaceAll(r, '\n', '<br/>');
	return r;
}

export const convertFromHtml = (text: string) => {
	let r = text;
	r = qstr.replaceAll(r, '\n', '\\n');
	return r;
}
