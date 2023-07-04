"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTransformJsonNull = void 0;
const writeTransformJsonNull = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ Prisma }', prismaClientPath);
    }
    writer
        .newLine()
        .write(`export type NullableJsonInput = `)
        .write(`Prisma.JsonValue | `)
        .write(`null | `)
        .write(`'JsonNull' | `)
        .write(`'DbNull' | `)
        .write(`Prisma.NullTypes.DbNull | `)
        .write(`Prisma.NullTypes.JsonNull;`)
        .blankLine();
    writer
        .write(`export const transformJsonNull = (v?: NullableJsonInput) => `)
        .inlineBlock(() => {
        writer
            .writeLine(`if (!v || v === 'DbNull') return Prisma.DbNull;`)
            .writeLine(`if (v === 'JsonNull') return Prisma.JsonNull;`)
            .writeLine(`return v;`);
    })
        .write(`;`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default transformJsonNull;`);
    }
};
exports.writeTransformJsonNull = writeTransformJsonNull;
//# sourceMappingURL=writeTransformJsonNull.js.map