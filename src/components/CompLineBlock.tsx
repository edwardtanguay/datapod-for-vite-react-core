import { ILineBlockDataItem } from "../interfaces";

interface IProps {
	lineBlockDataItem: ILineBlockDataItem;
}

export const CompLineBlock = ({ lineBlockDataItem }: IProps) => {

	return (
		<div className="bg-gray-200 text-orange-700 text-xs mb-3 font-mono py-2 px-4 w-fit">
			{lineBlockDataItem.lines.map((line,index) => {
				return (
					<div key={index}>{line}</div>
				)
			})}
		</div>
	);
};
