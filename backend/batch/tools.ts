import * as qstr from '../../share/qtools/qstr';

export const createDpodText = (lines: string[]): string => {
	let r = "";

	for (const line of lines) {
		const parts = qstr.breakIntoParts(line, ';');
		const project = parts[0];
		const title = parts[1];
		const _rank = parts[2];

		// exceptions
		const rank = _rank ? _rank : '3.0';

		const dpodDataBlock = `
==task
${project}
${title}
nn
${rank}
todo
		`.trim();

		r += dpodDataBlock + '\n\n';
	}

	return r;
};
