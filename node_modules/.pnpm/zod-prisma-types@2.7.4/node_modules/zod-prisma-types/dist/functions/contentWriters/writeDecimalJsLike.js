"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDecimalJsLike = void 0;
const writeDecimalJsLike = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', `${prismaClientPath}`);
    }
    writer
        .blankLine()
        .writeLine(`export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default DecimalJSLikeSchema;`);
    }
};
exports.writeDecimalJsLike = writeDecimalJsLike;
//# sourceMappingURL=writeDecimalJsLike.js.map