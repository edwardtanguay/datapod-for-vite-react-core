import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
	title: string;
}

export const ZodShowcaseDataInputWrapper = ({ children, title = "NO TITLE"}: IProps) => {
	return (
		<fieldset className="border border-orange-800 rounded pt-1 pb-3 px-3 ml-6 w-fit min-w-[40rem] mt-2">
			<legend className="text-orange-900 font-semibold">{title}</legend>
			{children}
		</fieldset>
	)
}