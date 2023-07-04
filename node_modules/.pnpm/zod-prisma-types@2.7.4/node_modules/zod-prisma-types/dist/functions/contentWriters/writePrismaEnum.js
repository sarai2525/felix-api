"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePrismaEnum = void 0;
const writePrismaEnum = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }, { useNativeEnum, values, name }) => {
    const { useMultipleFiles } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
    }
    if (useNativeEnum) {
        writer.blankLine().write(`export const ${name}Schema = z.enum([`);
        values.forEach((value, idx) => {
            const writeComma = idx !== values.length - 1;
            writer.write(`'${value}'${writeComma ? ',' : ''}`);
        });
        writer.write(`]);`);
    }
    else {
        writer
            .conditionalWrite(useMultipleFiles && name.includes('NullableJson'), `import transformJsonNull from './transformJsonNull'`)
            .blankLine()
            .write(`export const ${name}Schema = z.enum([`);
        values.forEach((value) => {
            writer.write(`'${value}',`);
        });
        writer
            .write(`])`)
            .conditionalWrite(!name.includes('Nullable'), `;`)
            .conditionalWrite(name.includes('Nullable'), `.transform((v) => transformJsonNull(v));`);
    }
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${name}Schema;`);
    }
};
exports.writePrismaEnum = writePrismaEnum;
//# sourceMappingURL=writePrismaEnum.js.map