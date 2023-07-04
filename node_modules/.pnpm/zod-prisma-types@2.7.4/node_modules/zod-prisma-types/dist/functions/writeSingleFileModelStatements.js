"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileModelStatements = void 0;
const contentWriters_1 = require("./contentWriters");
const writeSingleFileModelStatements = (dmmf, fileWriter) => {
    if (!dmmf.generatorConfig.createModelTypes)
        return;
    fileWriter.writeHeading(`MODELS`, 'FAT');
    dmmf.datamodel.models.forEach((model) => {
        (0, contentWriters_1.writeModelOrType)({ fileWriter, dmmf }, model);
        fileWriter.writer.newLine();
    });
};
exports.writeSingleFileModelStatements = writeSingleFileModelStatements;
//# sourceMappingURL=writeSingleFileModelStatements.js.map