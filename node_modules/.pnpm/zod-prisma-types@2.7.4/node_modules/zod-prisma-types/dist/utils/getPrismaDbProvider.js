"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientProvider = void 0;
const zod_1 = require("zod");
const providerSchema = zod_1.z.string();
const getPrismaClientProvider = (options) => {
    const provider = providerSchema.parse(options.datasources[0].provider);
    if (provider === 'mongodb') {
        return {
            provider,
            isMongoDb: 'true',
        };
    }
    return { provider, isMongoDb: 'false' };
};
exports.getPrismaClientProvider = getPrismaClientProvider;
//# sourceMappingURL=getPrismaDbProvider.js.map