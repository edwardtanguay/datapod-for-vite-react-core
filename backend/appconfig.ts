import * as qfil from '../share/qtools/qfil';
import * as apptools from './apptools';
import * as appconfig from './appconfig';
import _itemTypeTargets from './data/itemTypeTargets.json';

export const appIdCode = (): string => {
	const packageJsonObj = qfil.readJsonFile('./package.json');
	const idCode = packageJsonObj.name;
	return idCode;
}

export const frontendPort = (): number => {
	const packageJsonObj = qfil.readJsonFile('./package.json');
	const devCommand = packageJsonObj.scripts.frontend;
	const port = apptools.extractPortNumber(devCommand);
	return port;
}

export const version = (): string => {
	return '0.1.0';
}

export const backendPort = (): number => {
	return 3041;
}

export const importDirectory = (): string => {
	return 'currentImport';
}

export const backendBaseUrl = (): string => {
	return `http://localhost:${appconfig.backendPort()}`;
}

export const etsiteDataRelativePathAndFileName = (): string => {
	return '../edward-tanguay-eu/src/data';
}

export const itemTypeTargets = () => {
	return _itemTypeTargets;
}

export const systemDataTypeIdCodes = ():string[] => {
	return ['dpodId', 'dpodWhenCreated'];
}

export const blankLineMarker = (): string => {
	return 'nn';
}