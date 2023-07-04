"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeArgs = void 0;
const writeArgs = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }, model) => {
    const { useMultipleFiles, prismaClientPath, inputTypePath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', prismaClientPath);
        writeImport(`{ ${model.name}SelectSchema }`, `../${inputTypePath}/${model.name}SelectSchema`);
        writeImport(`{ ${model.name}IncludeSchema }`, `../${inputTypePath}/${model.name}IncludeSchema`);
    }
    writer
        .blankLine()
        .write(`export const ${model.name}ArgsSchema: `)
        .write(`z.ZodType<Prisma.${model.name}Args> = `)
        .write(`z.object(`)
        .inlineBlock(() => {
        writer
            .write(`select: `)
            .write(`z.lazy(() => ${model.name}SelectSchema).optional(),`)
            .newLine()
            .conditionalWrite(model.hasRelationField(), `include: z.lazy(() => ${model.name}IncludeSchema).optional(),`);
    })
        .write(`).strict();`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${model.name}ArgsSchema;`);
    }
};
exports.writeArgs = writeArgs;
//# sourceMappingURL=writeArgs.js.map