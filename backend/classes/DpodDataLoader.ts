/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as qstr from '../../share/qtools/qstr';
import { ILineBlockDataItem } from '../../src/interfaces';
import { DpodItem } from './DpodItem';
import { DpodSchema } from './DpodSchema';
import { LineBlock } from './LineBlock';

export class DpodDataLoader {
	private content = '';
	private lines: string[] = [];
	private lineBlocks: LineBlock[] = [];
	private dpodSchemas: DpodSchema[] = [];
	private dpodItems: DpodItem[] = [];
	private dpodItemGroups: any = {};
	private jsonData: any = {};
	private csvData: any = {};
	private xmlData: any = {};
	private datapodData: any = {};

	constructor(content: string) {
		this.content = content;
		this.createLines();
		this.createLineBlocks();
		this.createDpodSchemas();
		this.createItems();
		this.createDpodItemGroups();
		this.createJsonData();
		this.createCsvData();
		this.createXmlData();
		this.createDatapodData();
	}

	private createXmlData() {
		const keys = Object.keys(this.dpodItemGroups);
		for (const key of keys) {
			const dpodItems: DpodItem[] = this.dpodItemGroups[key];
			const xmlDataTexts = [];
			let index = 0;
			let firstLine = '';
			let lastLine = '';
			for (const dpodItem of dpodItems) {
				if (index === 0) {
					firstLine = `<?xml version="1.0" encoding="UTF-8"?>\n<${dpodItem.getSchemaIdCode()}>`;
					lastLine = `</${dpodItem.getSchemaIdCode()}>`;
				}
				xmlDataTexts.push(dpodItem.getXmlData());
				index++;
			}
			this.xmlData[key] = firstLine + '\n' + xmlDataTexts.join('\n') + '\n' + lastLine;
		}
	}

	private createJsonData() {
		const keys = Object.keys(this.dpodItemGroups);
		for (const key of keys) {
			const dpodItems: DpodItem[] = this.dpodItemGroups[key];
			const jsonDataTexts = [];
			for (const dpodItem of dpodItems) {
				jsonDataTexts.push(dpodItem.getJsonData());
			}
			this.jsonData[key] = jsonDataTexts.join(',\n');
		}
	}

	private createDatapodData() {
		const keys = Object.keys(this.dpodItemGroups);
		for (const key of keys) {
			const dpodItems: DpodItem[] = this.dpodItemGroups[key];
			const datapodDataTexts = [];
			for (const dpodItem of dpodItems) {
				datapodDataTexts.push(dpodItem.getDatapodData());
			}
			this.datapodData[key] = datapodDataTexts.join('\n\n');
		}
	}

	private createCsvData() {
		const keys = Object.keys(this.dpodItemGroups);
		for (const key of keys) {
			const dpodItems: DpodItem[] = this.dpodItemGroups[key];
			const csvDataTexts = [];
			let index = 0;
			let labelLine = '';
			for (const dpodItem of dpodItems) {
				if (index === 0) {
					labelLine = dpodItem.getCsvLabelLine();
				}
				csvDataTexts.push(dpodItem.getCsvData());
				index++;
			}
			this.csvData[key] = labelLine + '\n' + csvDataTexts.join('\n');
		}
	}

	private createDpodItemGroups() {
		for (const dpodItem of this.dpodItems) {
			const schemaIdCode = dpodItem.getSchemaIdCode();
			if (!this.dpodItemGroups.hasOwnProperty(schemaIdCode)) {
				this.dpodItemGroups[schemaIdCode] = [];
			}
			this.dpodItemGroups[schemaIdCode].push(dpodItem);
		}
	}

	public debug() {
		console.log(`=== DpodDataLoader ===`);
		console.log(`number of dpodItems: ${this.dpodItems.length}`);
	}

	private createItems() {
		for (const lineBlock of this.lineBlocks) {
			const lineBlockKind = lineBlock.getKind();
			if (lineBlockKind === 'item') {
				const dpodItem = new DpodItem(lineBlock, this);
				this.dpodItems.push(dpodItem);
			}
		}
	}

	public getLineBlockDataItems(): ILineBlockDataItem[] {
		return this.lineBlocks.map(m => m.getLineBlockDataItem());
	}

	private createLines() {
		this.lines = qstr.convertStringBlockToLines(this.content);
	}

	private createLineBlocks() {
		let lineBlock = new LineBlock();
		let isRecordingLineBlock = false;
		let isInsideMultilineBlock = false;
		for (const line of this.lines) {

			// don't let a blank line inside a multiline block end the item
			if (isInsideMultilineBlock && qstr.isEmpty(line)) {
				lineBlock.addLine(line);
				continue;
			}

			// ignore multiline begin and end markers
			if (['[[',']]'].includes(line)) {
				if (line === '[[') {
					isInsideMultilineBlock = true;
				}
				if (line === ']]') {
					isInsideMultilineBlock = false;
				}
				lineBlock.addLine(line);
				continue;
			}

			// ignore empty lines in file
			if (!isRecordingLineBlock && qstr.isEmpty(line)) {
				continue;
			}

			// we need to start recording a line block again
			if (!isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock = new LineBlock();
				isRecordingLineBlock = true;
			}

			// we are recording a line block and we need to add the current line
			if (isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock.addLine(line);
			}

			// we need to finish recording a line block
			if (isRecordingLineBlock && qstr.isEmpty(line)) {
				this.lineBlocks.push(lineBlock);
				isRecordingLineBlock = false;
			}
		}

		// record last one
		if (isRecordingLineBlock) {
			this.lineBlocks.push(lineBlock);
		}
	}

	public createDpodSchemas(): void {
		for (const lineBlock of this.lineBlocks) {
			const lineBlockKind = lineBlock.getKind();
			if (lineBlockKind === 'schema') {
				const dpodSchema = new DpodSchema(lineBlock)
				this.dpodSchemas.push(dpodSchema);
			}
		}
	}

	public getDpodSchemas() {
		return this.dpodSchemas
	}

	public getDpodSchemaDataItems() {
		const dpodSchemaDataItems: any[] = [];
		for (const dpodSchema of this.dpodSchemas) {
			dpodSchemaDataItems.push(dpodSchema.getDataItem());
		}
		return dpodSchemaDataItems;
	}

	public getDpodItemGroupDataItems() {
		const ra = [];
		const keys = Object.keys(this.dpodItemGroups);
		for (const key of keys) {
			const dpodItems: DpodItem[] = this.dpodItemGroups[key];
			const dpodDataItems = dpodItems.map(m => m.getDataItem())
			const titlePlural = qstr.forceTitleNotation(key);
			const titleSingular = qstr.forceSingular(titlePlural);
			ra.push({
				idCode: key,
				label: titlePlural,
				singleLabel: titleSingular,
				jsonData: this.jsonData[key],
				csvData: this.csvData[key],
				xmlData: this.xmlData[key],
				datapodData: this.datapodData[key],
				dpodItems: dpodDataItems
			})
		}
		return ra;
	}

}