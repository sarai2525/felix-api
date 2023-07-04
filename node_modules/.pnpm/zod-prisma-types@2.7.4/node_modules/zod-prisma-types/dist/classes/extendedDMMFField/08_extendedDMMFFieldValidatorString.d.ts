import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldValidatorMap } from './07_extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';
export declare class ExtendedDMMFFieldValidatorString extends ExtendedDMMFFieldValidatorMap {
    readonly zodValidatorString?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getZodValidatorString;
    private _getZodValidatorStringWithoutArray;
}
//# sourceMappingURL=08_extendedDMMFFieldValidatorString.d.ts.map