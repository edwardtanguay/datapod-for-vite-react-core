import chalk from "chalk";

export const log = (where: string, variableName: string, value: unknown) => {
	if (typeof value === "string") {
		if (value.includes("\n")) {
			console.log(
				chalk.red(`${where}>>>`) + chalk.yellow(` ${variableName}=[`)
			);
			console.log(chalk.blue(value));
			console.log(chalk.yellow(`]`));
		} else {
			console.log(
				chalk.red(`${where}>>>`) +
					chalk.yellow(` ${variableName}=[`) +
					chalk.blue(value) +
					chalk.yellow(`]`)
			);
		}
	}
	if (typeof value === "object") {
		console.log(
			chalk.red(`${where}>>>`) +
				chalk.yellow(` ${variableName}=[`) +
				chalk.blue(value) +
				chalk.yellow(`]`)
		);
	}
};
