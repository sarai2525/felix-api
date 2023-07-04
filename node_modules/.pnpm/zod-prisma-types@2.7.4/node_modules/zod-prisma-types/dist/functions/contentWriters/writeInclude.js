"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInclude = void 0;
const writeInclude = ({ fileWriter: { writer, writeImport, writeImportSet }, dmmf, }, model, getSingleFileContent = false) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', prismaClientPath);
        writeImportSet(model.includeImports);
    }
    writer
        .blankLine()
        .write(`export const ${model.name}IncludeSchema: `)
        .write(`z.ZodType<Prisma.${model.name}Include> = `)
        .write(`z.object(`)
        .inlineBlock(() => {
        model.fields.forEach((field) => {
            if (field.writeIncludeField) {
                writer
                    .write(`${field.name}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .conditionalWrite(field.isListOutputType(), `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`)
                    .conditionalWrite(!field.isListOutputType(), `z.lazy(() => ${field.outputType.type}ArgsSchema)`)
                    .write(`]).optional(),`)
                    .newLine();
            }
        });
    })
        .write(`).strict()`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${model.name}IncludeSchema;`);
    }
};
exports.writeInclude = writeInclude;
//# sourceMappingURL=writeInclude.js.map