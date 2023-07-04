import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldValidatorPattern } from './04_extendedDMMFFieldValidatorPattern';
import { GeneratorConfig } from '../../schemas';
export declare class ExtendedDMMFFieldDefaultValidators extends ExtendedDMMFFieldValidatorPattern {
    protected _defaultValidatorString?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _setZodDefaultValidator;
    private _isCuid;
    private _isUuid;
    private _isInt;
    private _IsFieldDefault;
    private _updateValidatorList;
}
//# sourceMappingURL=05_extendedDMMFFieldDefaultValidators.d.ts.map