"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileImportStatements = void 0;
const writeSingleFileImportStatements = (dmmf, { writer, writeImport }) => {
    const { prismaClientPath } = dmmf.generatorConfig;
    writeImport('{ z }', 'zod');
    if (dmmf.schema.hasJsonTypes) {
        writeImport(`{ Prisma }`, `${prismaClientPath}`);
    }
    else {
        writeImport(`type { Prisma }`, `${prismaClientPath}`);
    }
    if (dmmf.customImports) {
        dmmf.customImports.forEach((statement) => {
            writer.writeLine(statement);
        });
    }
};
exports.writeSingleFileImportStatements = writeSingleFileImportStatements;
//# sourceMappingURL=writeSingleFileImportStatements.js.map