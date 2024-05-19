import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
	title: string;
}

export const ZodShowcaseDataInputWrapper = ({ children, title = "NO TITLE"}: IProps) => {
	return (
		<fieldset className="border border-orange-800 rounded pt-2 pb-4 px-4 ml-6 w-fit min-w-[40rem] max-w-[60rem] mt-2">
			<legend className="text-gray-900 font-semibold bg-gray-500 px-2 rounded">{title}</legend>
			{children}
		</fieldset>
	)
}