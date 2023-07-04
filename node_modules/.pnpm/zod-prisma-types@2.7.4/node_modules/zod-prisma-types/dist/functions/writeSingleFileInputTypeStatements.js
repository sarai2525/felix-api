"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileInputTypeStatements = void 0;
const contentWriters_1 = require("./contentWriters");
const writeSingleFileInputTypeStatements = (dmmf, fileWriter) => {
    if (!dmmf.generatorConfig.createInputTypes)
        return;
    fileWriter.writer.blankLine();
    fileWriter.writeHeading(`INPUT TYPES`, 'FAT');
    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
        (0, contentWriters_1.writeInputObjectType)({ dmmf, fileWriter }, inputType);
        fileWriter.writer.newLine();
    });
};
exports.writeSingleFileInputTypeStatements = writeSingleFileInputTypeStatements;
//# sourceMappingURL=writeSingleFileInputTypeStatements.js.map