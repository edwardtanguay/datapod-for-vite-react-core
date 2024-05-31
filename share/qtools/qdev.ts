import chalk from "chalk";

export const log = (where: string, variableName: string, value: unknown) => {
	if (typeof value === "string" && variableName.trim() === "") {
		console.log(chalk.red(`${where}>>>`) + chalk.green(` ${value}`));
	} else if (typeof value === "string" || typeof value === "number") {
		const strValue = String(value);
		if (strValue.includes("\n")) {
			console.log(
				chalk.red(`${where}>>>`) + chalk.yellow(` ${variableName}=[`)
			);
			console.log(chalk.blue(strValue));
			console.log(chalk.yellow(`]`));
		} else {
			console.log(
				chalk.red(`${where}>>>`) +
					chalk.yellow(` ${variableName}=[`) +
					chalk.blue(value) +
					chalk.yellow(`]`)
			);
		}
	} else if (typeof value === "boolean") {
		console.log(
			chalk.red(`${where}>>>`) +
				chalk.yellow(` ${variableName}=[`) +
				chalk.blue(value) +
				chalk.yellow(`]`)
		);
	}
	if (typeof value === "object") {
		console.log(
			chalk.red(`${where}>>>`) + chalk.yellow(` ${variableName}=[`)
		);
		console.log(chalk.blue(JSON.stringify(value, null, 2)));
		console.log(chalk.yellow(`]`));
	}
};
