import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { GeneratorConfig } from '../schemas';
export interface ExtendedDMMFDatamodelOptions {
    datamodel: DMMF.Datamodel;
    config: GeneratorConfig;
}
export declare class ExtendedDMMFDatamodel {
    readonly generatorConfig: GeneratorConfig;
    readonly enums: ExtendedDMMFEnum[];
    readonly models: ExtendedDMMFModel[];
    readonly types: ExtendedDMMFModel[];
    constructor(generatorConfig: GeneratorConfig, datamodel: DMMF.Datamodel);
    private _getExtendedModels;
    private _getExtendedEnums;
}
//# sourceMappingURL=extendedDMMFDatamodel.d.ts.map