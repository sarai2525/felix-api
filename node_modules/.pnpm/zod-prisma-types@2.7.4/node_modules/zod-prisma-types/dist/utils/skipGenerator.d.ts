import { z } from 'zod';
export declare const processSchema: z.ZodObject<{
    env: z.ZodObject<{
        SKIP_ZOD_PRISMA: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        SKIP_ZOD_PRISMA: boolean;
    }, {
        SKIP_ZOD_PRISMA?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    env: {
        SKIP_ZOD_PRISMA: boolean;
    };
}, {
    env: {
        SKIP_ZOD_PRISMA?: string | undefined;
    };
}>;
export declare const skipGenerator: () => boolean;
//# sourceMappingURL=skipGenerator.d.ts.map