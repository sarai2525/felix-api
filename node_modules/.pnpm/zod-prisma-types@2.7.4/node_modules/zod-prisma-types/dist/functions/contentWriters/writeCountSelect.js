"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCountSelect = void 0;
const writeCountSelect = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }, model) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', prismaClientPath);
    }
    writer
        .blankLine()
        .write(`export const ${model.name}CountOutputTypeSelectSchema: `)
        .write(`z.ZodType<Prisma.${model.name}CountOutputTypeSelect> = `)
        .write(`z.object(`)
        .inlineBlock(() => {
        model.fields.forEach((field) => {
            if (field.isListOutputType() && field.isObjectOutputType()) {
                writer.writeLine(`${field.name}: z.boolean().optional(),`);
            }
        });
    })
        .write(`).strict();`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer
            .blankLine()
            .writeLine(`export default ${model.name}CountOutputTypeSelectSchema;`);
    }
};
exports.writeCountSelect = writeCountSelect;
//# sourceMappingURL=writeCountSelect.js.map