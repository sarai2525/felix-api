"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const zod_1 = require("zod");
const classes_1 = require("./classes");
const generateMultipleFiles_1 = require("./generateMultipleFiles");
const generateSingleFile_1 = require("./generateSingleFile");
const utils_1 = require("./utils");
const parseGeneratorConfig_1 = require("./utils/parseGeneratorConfig");
const outputSchema = zod_1.z.object({
    fromEnvVar: zod_1.z.string().nullable(),
    value: zod_1.z.string({ required_error: 'No output path specified' }),
});
(0, generator_helper_1.generatorHandler)({
    onManifest: () => {
        return {
            defaultOutput: './generated/zod',
            prettyName: 'Zod Prisma Types',
        };
    },
    onGenerate: async (generatorOptions) => {
        if ((0, utils_1.skipGenerator)())
            return;
        const config = (0, parseGeneratorConfig_1.parseGeneratorConfig)(generatorOptions);
        const output = outputSchema.parse(generatorOptions.generator.output);
        const extendedDMMF = new classes_1.ExtendedDMMF(generatorOptions.dmmf, config);
        classes_1.DirectoryHelper.removeDir(output.value);
        classes_1.DirectoryHelper.createDir(output.value);
        if (extendedDMMF.generatorConfig.useMultipleFiles) {
            return (0, generateMultipleFiles_1.generateMultipleFiles)({
                dmmf: extendedDMMF,
                path: output.value,
            });
        }
        return (0, generateSingleFile_1.generateSingleFile)({
            dmmf: extendedDMMF,
            path: output.value,
        });
    },
});
//# sourceMappingURL=generatorHandler.js.map