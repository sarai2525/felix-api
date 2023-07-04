import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchema } from './extendedDMMFSchema';
import { GeneratorConfig } from '../schemas';
export declare class ExtendedDMMF implements DMMF.Document {
    readonly generatorConfig: GeneratorConfig;
    readonly datamodel: ExtendedDMMFDatamodel;
    readonly schema: ExtendedDMMFSchema;
    readonly mappings: DMMF.Mappings;
    readonly imports: Set<string>;
    readonly customImports: Set<string>;
    constructor(dmmf: DMMF.Document, config: GeneratorConfig);
    private _getExtendedDatamodel;
    private _getExtendedSchema;
    private _getImports;
    private _getCustomImports;
    private _getExtendedMappings;
    private _setGeneratorConfig;
}
//# sourceMappingURL=extendedDMMF.d.ts.map