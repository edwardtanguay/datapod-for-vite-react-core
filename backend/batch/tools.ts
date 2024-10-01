import * as qstr from '../../share/qtools/qstr';

export const createDpodText = (lines: string[]): string => {
	let r = "";

	for (const line of lines) {
		const parts = qstr.breakIntoParts(line, ';');
		const category = parts[0];
		r += category + '\n';
	}

	return r;
};
