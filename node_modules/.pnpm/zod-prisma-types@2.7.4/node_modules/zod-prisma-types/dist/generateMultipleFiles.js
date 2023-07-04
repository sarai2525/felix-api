"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMultipleFiles = void 0;
const classes_1 = require("./classes");
const functions_1 = require("./functions");
const generateMultipleFiles = ({ dmmf, path }) => {
    const { createModelTypes, createInputTypes, writeBarrelFiles } = dmmf.generatorConfig;
    if (writeBarrelFiles) {
        new classes_1.FileWriter().createFile(`${path}/index.ts`, ({ writeExport }) => {
            if (createModelTypes) {
                writeExport('*', './modelSchema');
            }
            writeExport('*', `./${dmmf.generatorConfig.inputTypePath}`);
            if (createInputTypes) {
                writeExport('*', `./${dmmf.generatorConfig.outputTypePath}`);
            }
        });
    }
    (0, functions_1.writeModelFiles)({ path, dmmf });
    (0, functions_1.writeInputTypeFiles)({ path, dmmf });
    (0, functions_1.writeArgTypeFiles)({ path, dmmf });
};
exports.generateMultipleFiles = generateMultipleFiles;
//# sourceMappingURL=generateMultipleFiles.js.map