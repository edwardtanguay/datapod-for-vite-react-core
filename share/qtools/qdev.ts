import chalk from "chalk";

export const log = (where: string, variableName: string, value: string) => {
	if (value.includes("\n")) {
		console.log("multiline");
	} else {
		console.log(chalk.red(`${where}>>>`) + chalk.yellow(` ${variableName}=[`) + chalk.blue(value) + chalk.yellow(`]`));
	}
};
