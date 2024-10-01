/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import * as https from "https";
import * as qfil from './qfil';

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

export const getFileNameFromPathAndFileName = (
	pathAndFileName: string
): string => {
	return path.basename(pathAndFileName);
};

export const downloadImageFile = (
	sourcePathAndFileName: string,
	targetPathAndFileName: string
): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (!/^https?:/.test(sourcePathAndFileName)) {
			return reject(
				new Error("Invalid URL. Must start with http or https.")
			);
		}

		const file = fs.createWriteStream(targetPathAndFileName);

		https
			.get(sourcePathAndFileName, (response: any) => {
				if (response.statusCode !== 200) {
					return reject(
						new Error(
							`Failed to get '${sourcePathAndFileName}' (${response.statusCode})`
						)
					);
				}
				response.pipe(file);
				file.on("finish", () => {
					file.close(() => resolve());
				});
			})
			.on("error", (err) => {
				fs.unlink(targetPathAndFileName, () => reject(err));
			});

		file.on("error", (err) => {
			fs.unlink(targetPathAndFileName, () => reject(err));
		});
	});
};

export const appendTextToFile = (
	text: string,
	pathAndFileName2: string
): void => {
	console.log(`appending ${text.length} chars to ${pathAndFileName2}`);
		
};
