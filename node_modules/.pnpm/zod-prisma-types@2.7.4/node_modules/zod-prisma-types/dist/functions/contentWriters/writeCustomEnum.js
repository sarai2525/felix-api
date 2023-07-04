"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCustomEnum = void 0;
const writeCustomEnum = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }, { name, values }) => {
    const { useMultipleFiles } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
    }
    writer.blankLine().write(`export const ${name}Schema = z.enum([`);
    values.forEach((value, idx) => {
        const writeComma = idx !== values.length - 1;
        writer.write(`'${value.name}'${writeComma ? ',' : ''}`);
    });
    writer
        .write(`]);`)
        .blankLine()
        .writeLine(`export type ${name}Type = \`\${z.infer<typeof ${name}Schema>}\``);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${name}Schema;`);
    }
};
exports.writeCustomEnum = writeCustomEnum;
//# sourceMappingURL=writeCustomEnum.js.map