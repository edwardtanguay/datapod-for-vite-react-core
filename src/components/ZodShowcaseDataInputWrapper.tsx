import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
	title: string;
}

export const ZodShowcaseDataInputWrapper = ({ children, title = "NO TITLE"}: IProps) => {
	return (
		<fieldset className="border border-orange-800 rounded pt-2 pb-4 px-4 ml-6 w-fit min-w-[40rem] max-w-[60rem] mt-2">
			<legend className="text-orange-900 font-semibold">{title}</legend>
			{children}
		</fieldset>
	)
}