"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGeneratorConfig = void 0;
const getPrismaClientOutputPath_1 = require("./getPrismaClientOutputPath");
const getPrismaDbProvider_1 = require("./getPrismaDbProvider");
const schemas_1 = require("../schemas");
const parseGeneratorConfig = (generatorOptions) => {
    return schemas_1.configSchema.parse({
        ...generatorOptions.generator.config,
        ...(0, getPrismaClientOutputPath_1.getPrismaClientOutputPath)(generatorOptions),
        ...(0, getPrismaDbProvider_1.getPrismaClientProvider)(generatorOptions),
    });
};
exports.parseGeneratorConfig = parseGeneratorConfig;
//# sourceMappingURL=parseGeneratorConfig.js.map