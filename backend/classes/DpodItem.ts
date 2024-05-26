import { LineBlock } from "./LineBlock";
import * as qstr from "../../share/qtools/qstr";
import { DpodDataLoader } from "./DpodDataLoader";
import { DpodSchema } from "./DpodSchema";
import { DataType } from "./DataType";
import { Factory } from "./Factory";
import * as appConfig from "../appconfig";

export class DpodItem {
	private lineBlock: LineBlock;
	private schemaIdCode: string = "";
	private singularSchemaIdCode: string = "";
	private dpodSchema!: DpodSchema;
	private dpodDataLoader;
	public dataTypes: DataType[] = [];

	constructor(lineBlock: LineBlock, dpodDataLoader: DpodDataLoader) {
		this.lineBlock = lineBlock;
		this.dpodDataLoader = dpodDataLoader;
		this.createSchemaCodes();
		this.defineDpodSchema();
		// this.forceCorrectNumberOfProperties();
		this.createDataTypes();
		this.forceDefaultTypesForAllMissingProperties();
	}

	private forceDefaultTypesForAllMissingProperties() {
		for (const dataType of this.dataTypes) {
			dataType.forceDefaultValue();
		}
	}

	// private forceCorrectNumberOfProperties() {
	// 	const numberOfPropertiesToAdd =
	// 		this.dpodSchema.getNumberOfDataTypes() -
	// 		this.lineBlock.getNumberOfLines();
	// 		console.log('numberOfDataTypes', this.dpodSchema.getNumberOfDataTypes());
	// 		console.log('numberOfLines', this.lineBlock.getNumberOfLines());
	// 		console.log('numberOfPropertiesToAdd', numberOfPropertiesToAdd);
	// 		console.log('---');
	// 	for (let x = 1; x <= numberOfPropertiesToAdd; x++) {
	// 		this.lineBlock.addLine("");
	// 	}
	// }

	public getSchemaBlock() {
		return this.dpodSchema.getSchemaBlock();
	}

	private createDataTypes() {
		const _dataTypes = this.dpodSchema.getDataTypes();
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		if (this.dpodSchema) {
			let index = -1;
			for (const _dataType of _dataTypes) {
				// const __dataType = new DataType(_dataType.getLabel());
				const creationLine =
					_dataType.getLabel() + ";" + _dataType.getDataTypeIdCode();
				const __dataType = Factory.instantiateDataType(creationLine);
				if (index >= 0) {
					let fieldLine = fieldLines[index];
					if (fieldLine === "[[") {
						let innerContent = "";
						let innerFieldLine = "";
						while (innerFieldLine !== "]]") {
							innerContent += innerFieldLine + "\n";
							index++;
							innerFieldLine = fieldLines[index];
						}
						fieldLine = innerContent.trim();
					}
					if (fieldLine === appConfig.blankLineMarker()) {
						__dataType.setValue("");
					} else {
						__dataType.setValue(fieldLine);
					}
				} else {
					__dataType.setValue(qstr.generateShortUUID());
				}
				this.dataTypes.push(__dataType);
				index++;
			}
		}
	}

	private defineDpodSchema() {
		for (const dpodSchema of this.dpodDataLoader.getDpodSchemas()) {
			if (dpodSchema.getIdCode() === this.schemaIdCode) {
				this.dpodSchema = dpodSchema;
			}
		}
	}

	public getSchemaIdCode() {
		return this.schemaIdCode;
	}

	private createSchemaCodes() {
		this.singularSchemaIdCode = qstr
			.chopLeft(this.lineBlock.getFirstLine(), "==")
			.trim();
		this.schemaIdCode = qstr.forceCamelNotation(
			qstr.forcePlural(this.singularSchemaIdCode)
		);
	}

	public debug() {
		const lines: string[] = [];
		lines.push(`=== DpodItem ===`);
		lines.push(`schemaIdCode: ${this.schemaIdCode}`);
		lines.push(`singularSchemaIdCode: ${this.singularSchemaIdCode}`);
		if (this.dpodSchema) {
			lines.push(`dpodSchema idCode: ${this.dpodSchema.getIdCode()}`);
		}
		return qstr.convertLinesToStringBlock(lines);
	}

	public getDataItem() {
		return {
			singularSchemaIdCode: this.singularSchemaIdCode,
			dataTypes: this.dataTypes.map((m) => m.getDataItem()),
		};
	}

	private getJsonDataFieldText() {
		const jsonDataLines = [];
		for (const dataType of this.dataTypes) {
			jsonDataLines.push(`${dataType.getJsonDataLine()}`);
		}
		return jsonDataLines.join(",\n");
	}

	private getDatapodDataFieldText() {
		const datapodDataLines = [];
		for (const dataType of this.dataTypes) {
			datapodDataLines.push(`${dataType.getDatapodDataLine()}`);
		}
		return datapodDataLines.join("\n");
	}

	public getJsonData() {
		return `
{
${this.getJsonDataFieldText()}
}
		`.trim();
	}

	public getDatapodData() {
		return `
==${this.singularSchemaIdCode}
${this.getDatapodDataFieldText()}
		`.trim();
	}

	public getCsvLabelLine() {
		const csvDataFields = [];
		for (const dataType of this.dataTypes) {
			csvDataFields.push(`"${dataType.getLabel()}"`);
		}
		return csvDataFields.join(",");
	}

	public getCsvData() {
		const csvDataFields = [];
		for (const dataType of this.dataTypes) {
			csvDataFields.push(`"${dataType.getTextValue()}"`);
		}
		return csvDataFields.join(",");
	}

	public getXmlData() {
		const xmlDataFields = [];
		for (const dataType of this.dataTypes) {
			xmlDataFields.push(
				`\t\t<${dataType.getIdCode()}>${dataType.getTextValue()}</${dataType.getIdCode()}>`
			);
		}
		return `\t<${this.singularSchemaIdCode}>
${xmlDataFields.join("\n")}
\t</${this.singularSchemaIdCode}>`;
	}
}
