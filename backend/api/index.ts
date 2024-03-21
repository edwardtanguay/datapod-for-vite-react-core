/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import cors from 'cors';
import { IAppData } from '../../src/interfaces.js';
import * as qfil from '../../share/qtools/qfil.js';
import * as apptools from '../apptools.js';
import * as appconfig from '../appconfig.js';
import { DpodDataLoader } from '../classes/DpodDataLoader.js';

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
	res.status(200).json({ 'message': 'api works' });
});

app.get('/appdata', (_req, res) => {

	const pathAndFileNames = qfil.getFileNamesInDirectory(appconfig.importDirectory());
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);

	const appJsonData: IAppData = {
		appIdCode: appconfig.appIdCode(),
		frontendPort: appconfig.frontendPort(),
		backendPort: appconfig.backendPort(),
		fileObjects,
		entireContent,
		lineBlockDataItems: dpodDataLoader.getLineBlockDataItems(),
		dpodSchemaDataItems: dpodDataLoader.getDpodSchemaDataItems(),
		dpodItemGroupDataItems: dpodDataLoader.getDpodItemGroupDataItems()
	}
	res.status(200).json(appJsonData);
});

app.get('/parse-etsite-data', (req, res) => {
	const etSiteBase = appconfig.etsiteDataRelativePathAndFileName();	
	const pathAndFileNames = qfil.getFileNamesInDirectory(appconfig.importDirectory());
	const fileObjects = apptools.getFileObjects(pathAndFileNames);
	const entireContent = apptools.getEntireContent(fileObjects);
	const dpodDataLoader = new DpodDataLoader(entireContent);
	const dataItems = dpodDataLoader.getDpodItemGroupDataItems()
	apptools.createFile(`${etSiteBase}/itemType-runs.json`, (apptools.wrapAsArrayForJson((dataItems[0] as any).jsonData)));
	apptools.createFile(`${etSiteBase}/itemType-swims.json`, (apptools.wrapAsArrayForJson((dataItems[1] as any).jsonData)));
	apptools.createFile(`${etSiteBase}/itemType-weights.json`, (apptools.wrapAsArrayForJson((dataItems[2] as any).jsonData)));

	res.status(200);
})

app.listen(appconfig.backendPort(), () => {
	console.log(`---
APP: ${appconfig.appIdCode()}
FRONTEND URL: http://localhost:${appconfig.frontendPort()}
BACKEND URL: http://localhost:${appconfig.backendPort()}
BACKEND APP DATA: http://localhost:${appconfig.backendPort()}/appdata
`);
});