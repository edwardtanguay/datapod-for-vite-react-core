/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as qstr from '../../share/qtools/qstr';

const _texts = {
	originalText: "pageAndFileName",
	titleNotation: "",
	textNotation: "",
	pascalNotation: "",
	camelNotation: "",
};

export const PageNotation = () => {
	const [texts, setTexts] = useState(_texts);

	useEffect(() => {
		handleOriginalTextChange(texts.originalText);
	},[])

	const handleOriginalTextChange = (value:string) => {
		texts.originalText = value;
		texts.camelNotation = qstr.forceCamelNotation(value);
		texts.pascalNotation = qstr.forcePascalNotation(value);
		texts.titleNotation = qstr.forceTitleNotation(value);
		texts.textNotation = qstr.forceTextNotation(value);
		const _texts = structuredClone(texts);
		setTexts(_texts);
	};

	return (
		<>
			<form className="flex gap-3 mb-4 place-items-center">
				original text:{" "}
				<input
					autoFocus
					className="p-1 rounded w-64"
					value={texts.originalText}
					onChange={(e) => handleOriginalTextChange(e.target.value)}
				/>
			</form>
			<table className="notation">
				<tbody>
					<tr>
						<td>Camel notation</td>
						<td>{texts.camelNotation}</td>
					</tr>
					<tr>
						<td>Pascal notation</td>
						<td>{texts.pascalNotation}</td>
					</tr>
					<tr>
						<td>Title notation</td>
						<td>{texts.titleNotation}</td>
					</tr>
					<tr>
						<td>Text notation</td>
						<td>{texts.textNotation}</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};
