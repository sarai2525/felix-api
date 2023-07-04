"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSelect = void 0;
const writeSelect = ({ fileWriter: { writer, writeImport, writeImportSet }, dmmf, getSingleFileContent = false, }, model) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', prismaClientPath);
        writeImportSet(model.selectImports);
    }
    writer
        .blankLine()
        .write(`export const ${model.name}SelectSchema: `)
        .write(`z.ZodType<Prisma.${model.name}Select> = `)
        .write(`z.object(`)
        .inlineBlock(() => {
        model.fields.forEach((field) => {
            if (field.isEnumOutputType()) {
                return writer
                    .write(`${field.name}: `)
                    .write(`z.boolean()`)
                    .write(`.optional(),`)
                    .newLine();
            }
            if (field.writeSelectFindManyField) {
                return writer
                    .write(`${field.name}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(`z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`)
                    .write(`])`)
                    .write(`.optional()`)
                    .write(`,`)
                    .newLine();
            }
            if (field.writeSelectField) {
                return writer
                    .write(`${field.name}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
                    .write(`])`)
                    .write(`.optional()`)
                    .write(`,`)
                    .newLine();
            }
            return writer
                .write(`${field.name}: `)
                .write(`z.boolean()`)
                .write(`.optional(),`)
                .newLine();
        });
    });
    writer.write(`).strict()`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${model.name}SelectSchema;`);
    }
};
exports.writeSelect = writeSelect;
//# sourceMappingURL=writeSelect.js.map