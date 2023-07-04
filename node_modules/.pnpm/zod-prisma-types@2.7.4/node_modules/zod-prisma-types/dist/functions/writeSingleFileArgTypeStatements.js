"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileArgTypeStatements = void 0;
const contentWriters_1 = require("./contentWriters");
const writeSingleFileArgTypeStatements = (dmmf, fileWriter) => {
    if (!dmmf.generatorConfig.createInputTypes)
        return;
    fileWriter.writer.blankLine();
    fileWriter.writeHeading(`ARGS`, 'FAT');
    dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
        outputType.prismaActionFields.forEach((field) => {
            (0, contentWriters_1.writeOutputObjectType)({ dmmf, fileWriter }, field);
        });
    });
};
exports.writeSingleFileArgTypeStatements = writeSingleFileArgTypeStatements;
//# sourceMappingURL=writeSingleFileArgTypeStatements.js.map