import fs from "fs";

export const readJsonFile = (filePath: string) => {
	const jsonData = fs.readFileSync(filePath, "utf8");
	const jsonObject = JSON.parse(jsonData);
	return jsonObject;
};

export const readTextFile = (filePath: string) => {
	const text = fs.readFileSync(filePath, "utf8");
	return text;
};

export const getFileNamesInDirectory = (directory: string) => {
	const fileNames: string[] = [];
	if (fs.existsSync(directory)) {
		fs.readdirSync(directory).forEach((fileName: string) => {
			const relativePathAndFileName = directory + "/" + fileName;
			if (!fs.lstatSync(relativePathAndFileName).isDirectory()) {
				fileNames.push(fileName);
			}
		});
	}
	return fileNames;
};

export const getPathAndFileNamesInDirectory = (directory: string) => {
	const fileNames: string[] = [];
	if (fs.existsSync(directory)) {
		fs.readdirSync(directory).forEach((fileName: string) => {
			const relativePathAndFileName = directory + "/" + fileName;
			if (!fs.lstatSync(relativePathAndFileName).isDirectory()) {
				fileNames.push(relativePathAndFileName);
			}
		});
	}
	return fileNames;
};

export const writeToFile = (pathAndFileName: string, content: string): void => {
	fs.writeFile(pathAndFileName, content, (err) => {
		if (err) {
			console.error("Error writing to file:", err);
		} else {
			// TODO: log file write
		}
	});
};

/**
 * Creates a file with content
 *
 * pathAndFileName starts at root
 * tools.createFile('./logs/log.txt', 'added item');
 *
 * (file is created)
 */
export const createFile = (pathAndFileName: string, content: string) => {
	fs.writeFileSync(pathAndFileName, content.trim());
};


export const wrapAsArrayForJson = (objectsText: string) => {
	return `
[
${objectsText}
]	
	`;
};