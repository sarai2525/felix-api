import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldValidatorString } from './08_extendedDMMFFieldValidatorString';
import { GeneratorConfig } from '../../schemas';
export declare class ExtendedDMMFFieldCustomValidatorString extends ExtendedDMMFFieldValidatorString {
    readonly zodCustomValidatorString?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getZodCustomValidatorString;
    private _extractUsePattern;
}
//# sourceMappingURL=09_extendedDMMFFieldCustomValidatorString.d.ts.map