export const createDpodText = (lines: string[]): string => {
	let r = "";

	for (const line of lines) {
		r += line + "nnn" + '\n';
	}

	return r;
};
