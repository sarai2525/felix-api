"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientOutputPath = void 0;
const path_1 = __importDefault(require("path"));
const getPrismaClientOutputPath = (options) => {
    var _a, _b, _c, _d, _e;
    const prismaClientOptions = options.otherGenerators.find((g) => g.provider.value === 'prisma-client-js');
    if (!((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value) ||
        !(prismaClientOptions === null || prismaClientOptions === void 0 ? void 0 : prismaClientOptions.isCustomOutput) ||
        !((_b = prismaClientOptions === null || prismaClientOptions === void 0 ? void 0 : prismaClientOptions.output) === null || _b === void 0 ? void 0 : _b.value))
        return undefined;
    if ((_c = options.generator.config) === null || _c === void 0 ? void 0 : _c['prismaClientPath']) {
        return { prismaClientPath: (_d = options.generator.config) === null || _d === void 0 ? void 0 : _d['prismaClientPath'] };
    }
    const prismaClientPath = path_1.default
        .relative(options.generator.output.value, prismaClientOptions.output.value)
        .replace(/\\/g, '/');
    if (!prismaClientPath)
        return undefined;
    if ((_e = options.generator.config) === null || _e === void 0 ? void 0 : _e['useMultipleFiles']) {
        return { prismaClientPath: `../${prismaClientPath}` };
    }
    return { prismaClientPath };
};
exports.getPrismaClientOutputPath = getPrismaClientOutputPath;
//# sourceMappingURL=getPrismaClientOutputPath.js.map