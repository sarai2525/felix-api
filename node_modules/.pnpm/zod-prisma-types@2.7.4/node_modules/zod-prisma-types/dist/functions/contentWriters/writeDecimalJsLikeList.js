"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDecimalJsLikeList = void 0;
const writeDecimalJsLikeList = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImport('type { Prisma }', `${prismaClientPath}`);
    }
    writer
        .blankLine()
        .writeLine(`export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default DecimalJSLikeListSchema;`);
    }
};
exports.writeDecimalJsLikeList = writeDecimalJsLikeList;
//# sourceMappingURL=writeDecimalJsLikeList.js.map