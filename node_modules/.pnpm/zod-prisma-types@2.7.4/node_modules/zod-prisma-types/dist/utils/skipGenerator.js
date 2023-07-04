"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipGenerator = exports.processSchema = void 0;
const zod_1 = require("zod");
exports.processSchema = zod_1.z.object({
    env: zod_1.z.object({
        SKIP_ZOD_PRISMA: zod_1.z
            .string()
            .optional()
            .transform((val) => val === 'true'),
    }),
});
const skipGenerator = () => {
    const skipGenerator = exports.processSchema.parse(process).env.SKIP_ZOD_PRISMA;
    if (skipGenerator) {
        console.log('\x1b[33m', '!!!! Generation of zod schemas skipped! Generator is disabled via "SKIP_ZOD_PRISMA" environment variable !!!!', '\x1b[37m');
        return true;
    }
    return false;
};
exports.skipGenerator = skipGenerator;
//# sourceMappingURL=skipGenerator.js.map