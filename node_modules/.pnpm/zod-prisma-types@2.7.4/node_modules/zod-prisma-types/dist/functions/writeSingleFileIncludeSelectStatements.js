"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileIncludeSelectStatements = void 0;
const contentWriters_1 = require("./contentWriters");
const writeSingleFileIncludeSelectStatements = (dmmf, fileWriter) => {
    if (!dmmf.generatorConfig.createInputTypes)
        return;
    fileWriter.writer.blankLine();
    fileWriter.writeHeading(`SELECT & INCLUDE`, 'FAT');
    fileWriter.writer.blankLine();
    dmmf.schema.outputObjectTypes.model.forEach((model) => {
        fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');
        if (model.writeInclude()) {
            (0, contentWriters_1.writeInclude)({ fileWriter, dmmf }, model);
        }
        if (model.writeIncludeArgs()) {
            (0, contentWriters_1.writeArgs)({ fileWriter, dmmf }, model);
        }
        if (model.writeCountArgs()) {
            (0, contentWriters_1.writeCountArgs)({ fileWriter, dmmf }, model);
            (0, contentWriters_1.writeCountSelect)({ fileWriter, dmmf }, model);
        }
        (0, contentWriters_1.writeSelect)({ fileWriter, dmmf }, model);
        fileWriter.writer.blankLine();
    });
};
exports.writeSingleFileIncludeSelectStatements = writeSingleFileIncludeSelectStatements;
//# sourceMappingURL=writeSingleFileIncludeSelectStatements.js.map