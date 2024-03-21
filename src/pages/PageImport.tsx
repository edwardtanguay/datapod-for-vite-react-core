/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { CompLineBlock } from "../components/CompLineBlock";
import { CompDpodSchemaItem } from "../components/CompDpodSchema";
import { CompGroupDpodItems } from "../components/CompGroupDpodItems";

export const PageImport = () => {
	const { appData } = useContext(AppContext);
	const [areas, setAreas] = useState<any>({
		area01: false,
		area02: false,
		area03: false,
		area04: true,
	});

	const handleToggleArea = (areaIdCode: string) => {
		areas[areaIdCode] = !areas[areaIdCode];
		const _areas = structuredClone(areas);
		setAreas(_areas);
	};

	return (
		<div className="pageImport">
			<h2 onClick={() => handleToggleArea("area01")}>
				1. All files imported
			</h2>
			{areas.area01 && (
				<ul className="list-disc ml-6">
					{appData.fileObjects.map((fileObject, index) => {
						return (
							<li key={index}>
								<span className="font-mono font-semibold">
									{fileObject.pathAndFileName}
								</span>
								<textarea
									value={fileObject.content}
									readOnly
									className="block mb-3 w-1/2 h-48 p-3 font-mono text-xs text-orange-700"
								></textarea>
							</li>
						);
					})}
				</ul>
			)}

			<h2 onClick={() => handleToggleArea("area02")}>
				2. Content of all files combined
			</h2>
			{areas.area02 && (
				<textarea
					value={appData.entireContent}
					readOnly
					className="block mb-3 w-1/2 h-[20rem] p-3 font-mono text-xs text-orange-700 ml-6"
				/>
			)}

			<h2 onClick={() => handleToggleArea("area03")}>
				3. Line blocks generated
			</h2>
			{areas.area03 && (
				<div className="ml-6">
					<p className="mb-3">
						Number of LineBlocks:{" "}
						{appData.lineBlockDataItems.length}
					</p>
					{appData.lineBlockDataItems.map(
						(lineBlockDataItem, index) => {
							return (
								<div key={index}>
									<CompLineBlock
										lineBlockDataItem={lineBlockDataItem}
									/>
								</div>
							);
						}
					)}
				</div>
			)}

			<h2 onClick={() => handleToggleArea("area04")}>
				4. Datapod content generated
			</h2>
			{areas.area04 && (
				<>
					<div className="ml-6">
						<h3 className="text-xl mb-2">Schemas</h3>
						<div className="flex gap-3 flex-wrap">
							{appData.dpodSchemaDataItems.map(
								(dpodSchemaDataItem, index) => {
									return (
										<CompDpodSchemaItem
											dpodSchemaDataItem={
												dpodSchemaDataItem
											}
											key={index}
										/>
									);
								}
							)}
						</div>
					</div>
					<div className="ml-6 mt-12">
						{appData.dpodItemGroupDataItems.map(
							(group, index) => {
								return <CompGroupDpodItems group={group} key={index} />
							}
						)}
					</div>
				</>
			)}
		</div>
	);
};
