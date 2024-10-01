import * as qfil from "../../share/qtools/qfil";
import * as qstr from "../../share/qtools/qstr";
import * as tools from "./tools";

const content = qfil.readTextFile("./batchImport/tasks.txt");
const lines = qstr.convertStringBlockToLines(content);
const dpodText = tools.createDpodText(lines);

qfil.appendTextToFile(dpodText, "./currentImport/tasks.dpod.txt");
