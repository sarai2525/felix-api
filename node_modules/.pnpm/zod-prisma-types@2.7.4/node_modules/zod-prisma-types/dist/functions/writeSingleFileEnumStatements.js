"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileEnumStatements = void 0;
const _1 = require(".");
const writeSingleFileEnumStatements = (dmmf, fileWriter) => {
    fileWriter.writer.blankLine();
    fileWriter.writeHeading(`ENUMS`, 'FAT');
    dmmf.schema.enumTypes.prisma.forEach((enumData) => {
        (0, _1.writePrismaEnum)({ dmmf, fileWriter }, enumData);
    });
    dmmf.datamodel.enums.forEach((enumData) => {
        (0, _1.writeCustomEnum)({ fileWriter, dmmf }, enumData);
    });
    fileWriter.writer.newLine();
};
exports.writeSingleFileEnumStatements = writeSingleFileEnumStatements;
//# sourceMappingURL=writeSingleFileEnumStatements.js.map