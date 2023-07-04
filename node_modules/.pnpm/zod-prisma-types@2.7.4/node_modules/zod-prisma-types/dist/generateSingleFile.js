"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSingleFile = void 0;
const classes_1 = require("./classes");
const functions_1 = require("./functions");
const generateSingleFile = ({ dmmf, path }) => {
    new classes_1.FileWriter().createFile(`${path}/index.ts`, (fileWriter) => {
        (0, functions_1.writeSingleFileImportStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileHelperStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileEnumStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileModelStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileTypeStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileIncludeSelectStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileInputTypeStatements)(dmmf, fileWriter);
        (0, functions_1.writeSingleFileArgTypeStatements)(dmmf, fileWriter);
    });
};
exports.generateSingleFile = generateSingleFile;
//# sourceMappingURL=generateSingleFile.js.map