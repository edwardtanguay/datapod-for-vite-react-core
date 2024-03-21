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
}