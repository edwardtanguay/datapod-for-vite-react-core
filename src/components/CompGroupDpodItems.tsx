/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import * as qstr from "../../share/qtools/qstr";
import React from "react";

type DisplayFormatType = "table" | "json" | "csv" | "xml" | "datapod";

interface IProps {
	group: any;
}

export const CompGroupDpodItems = ({ group }: IProps) => {
	const [displayFormat, setDisplayFormat] =
		useState<DisplayFormatType>("table");

	const handleMenuSelect = (desiredDisplayForm: DisplayFormatType) => {
		if (desiredDisplayForm !== displayFormat) {
			setDisplayFormat(desiredDisplayForm);
		}
	};

	return (
		<section className="groupDpodItems">
			<h3 className="text-xl mb-2 flex gap-4">
				<span>
					{qstr.smartPlural(
						group.dpodItems.length,
						group.singleLabel
					)}
				</span>
				<span className="flex gap-3 text-[1rem] items-center bg-gray-300 px-4 rounded shadow-inner shadow-gray-700">
					<span
						className={
							displayFormat === "table"
								? "selected"
								: "unselected"
						}
						onClick={() => handleMenuSelect("table")}
					>
						table
					</span>
					<span
						className={
							displayFormat === "json" ? "selected" : "unselected"
						}
						onClick={() => handleMenuSelect("json")}
					>
						JSON
					</span>
					<span
						className={
							displayFormat === "csv" ? "selected" : "unselected"
						}
						onClick={() => handleMenuSelect("csv")}
					>
						CSV
					</span>
					<span
						className={
							displayFormat === "xml" ? "selected" : "unselected"
						}
						onClick={() => handleMenuSelect("xml")}
					>
						XML
					</span>
					<span
						className={
							displayFormat === "datapod"
								? "selected"
								: "unselected"
						}
						onClick={() => handleMenuSelect("datapod")}
					>
						Datapod
					</span>
				</span>
			</h3>
			<section className="mb-12">
				{displayFormat === "table" && (
					<table>
						<thead>
							{group.dpodItems.map(
								(dpodItem: any, index: number) => {
									return (
										<React.Fragment key={index}>
											{index === 0 && (
												<tr>
													{dpodItem.dataTypes.map(
														(
															dataType: any,
															index: number
														) => {
															return (
																<th key={index}>
																	{
																		dataType.label
																	}
																</th>
															);
														}
													)}
												</tr>
											)}
										</React.Fragment>
									);
								}
							)}
						</thead>
						<tbody>
							{group.dpodItems.map(
								(dpodItem: any, index: number) => {
									return (
										<tr key={index}>
											{dpodItem.dataTypes.map(
												(
													dataType: any,
													index: number
												) => {
													return (
														<td
															key={index}
															dangerouslySetInnerHTML={{
																__html: qstr.convertToHtml(
																	dataType.value
																),
															}}
														></td>
													);
												}
											)}
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				)}
				{displayFormat === "json" && (
					<textarea
						readOnly
						value={group.jsonData}
						className="h-[20rem] w-full bg-[#fff] p-4 border border-gray-800 outline-none text-orange-700 font-mono"
					/>
				)}
				{displayFormat === "csv" && (
					<textarea
						readOnly
						value={group.csvData}
						className="h-[20rem] w-full bg-[#fff] p-4 border border-gray-800 outline-none text-orange-700 font-mono"
					/>
				)}
				{displayFormat === "xml" && (
					<textarea
						readOnly
						value={group.xmlData}
						className="h-[20rem] w-full bg-[#fff] p-4 border border-gray-800 outline-none text-orange-700 font-mono"
					/>
				)}
				{displayFormat === "datapod" && (
					<textarea
						readOnly
						value={group.datapodData}
						className="h-[20rem] w-full bg-[#fff] p-4 border border-gray-800 outline-none text-orange-700 font-mono"
					/>
				)}
			</section>
		</section>
	);
};
