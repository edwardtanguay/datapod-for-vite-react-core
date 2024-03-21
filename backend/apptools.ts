import { IFileObject } from "../src/interfaces.js";
import * as qfil from '../share/qtools/qfil.js';
import * as appconfig from './appconfig.js';
import fs from 'fs';

export const extractPortNumber = (text: string) => {
	const regex = /(\d+)/;
	const match = text.match(regex);
	return match ? parseInt(match[0], 10) : 0;
}

/**
 * getFileObjects
 * 
 * const fileObjects = getFileObjects(pathAndFileNames);
 * 
 */
export const getFileObjects = (pathAndFileNames: string[]): IFileObject[] => {
	const fileObjects = [] as IFileObject[];
	for (const pathAndFileName of pathAndFileNames) {
		fileObjects.push({
			pathAndFileName,
			content: qfil.readTextFile(appconfig.importDirectory() + '/' + pathAndFileName)
		})
	}
	return fileObjects;
}

/**
 * getEntireContent
 * 
 * 
 */
export const getEntireContent = (fileObjects: IFileObject[]): string => {
	let r = '';
	for (const fileObject of fileObjects) {
		r += fileObject.content;
		r += '\n\n'
	}
	return r;
}

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
	`
}

