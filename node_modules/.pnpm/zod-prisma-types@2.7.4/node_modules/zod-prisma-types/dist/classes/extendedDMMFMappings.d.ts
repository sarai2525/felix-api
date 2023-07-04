import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
export declare class ExtendedDMMFMappings implements DMMF.Mappings {
    readonly generatorConfig: GeneratorConfig;
    readonly modelOperations: DMMF.ModelMapping[];
    readonly otherOperations: {
        readonly read: string[];
        readonly write: string[];
    };
    constructor(generatorConfig: GeneratorConfig, mappings: DMMF.Mappings);
}
//# sourceMappingURL=extendedDMMFMappings.d.ts.map