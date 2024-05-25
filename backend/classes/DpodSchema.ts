import { DataType } from "./DataType";
import { LineBlock } from "./LineBlock";
import * as qstr from "../../share/qtools/qstr";
import { Factory } from "./Factory";
import * as appConfig from "../appconfig";

export class DpodSchema {
	private lineBlock: LineBlock;
	private idCode: string = "";
	private label: string = "";
	private dataTypes: DataType[] = [];

	// ** Flashcards
	// front
	// back
	// rank;wn
	constructor(lineBlock: LineBlock) {
		this.lineBlock = lineBlock;
		this.createIdCode();
		this.createDataTypes();
	}

	public debug() {
		console.log(`=== DpodSchema ===`);
		console.log(`idCode: ${this.idCode}`);
		console.log(`label: ${this.label}`);
		console.log(`number of datatypes: ${this.dataTypes.length}`);
		console.log(``);
	}

	private getSchemaBlockDataTypeLines() {
		const lines: string[] = [];
		for (const dataType of this.dataTypes) {
			if (
				!appConfig
					.systemDataTypeIdCodes()
					.includes(dataType.getIdCode())
			) {
				lines.push(dataType.getIdCode());
			}
		}
		return qstr.convertLinesToStringBlock(lines);
	}

	public getSchemaBlock() {
		return `
** ${qstr.forceTitleNotation(this.idCode)}
${this.getSchemaBlockDataTypeLines()}
		`.trim();
	}

	public getIdCode() {
		return this.idCode;
	}

	public getNumberOfDataTypes() {
		return this.dataTypes.length;
	}

	private createIdCode() {
		this.label = qstr.chopLeft(this.lineBlock.getFirstLine(), "**").trim();
		this.idCode = qstr.forceCamelNotation(this.label);
	}

	private createDataTypes() {
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		const dataTypeSuuid = Factory.instantiateDataType("suuid");
		this.dataTypes.push(dataTypeSuuid);
		for (const fieldLine of fieldLines) {
			const dataType = Factory.instantiateDataType(fieldLine);
			if (dataType) {
				this.dataTypes.push(dataType);
			}
		}
	}

	public getDataItem() {
		return {
			idCode: this.idCode,
			label: this.label,
			dataTypes: this.dataTypes.map((m) => m.getDataItem()),
		};
	}

	public getDataTypes() {
		return this.dataTypes;
	}
}
