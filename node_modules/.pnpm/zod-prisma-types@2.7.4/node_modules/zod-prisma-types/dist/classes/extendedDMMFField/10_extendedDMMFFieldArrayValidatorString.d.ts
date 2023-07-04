import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldCustomValidatorString } from './09_extendedDMMFFieldCustomValidatorString';
import { ValidatorMap } from './07_extendedDMMFFieldValidatorMap';
import { GeneratorConfig } from '../../schemas';
export type ZodArrayValidatorKeys = 'min' | 'max' | 'length' | 'nonempty';
export declare const ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX: RegExp;
export declare const ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX: RegExp;
export declare const ARRAY_VALIDATOR_WITH_MESSAGE_REGEX: RegExp;
export declare const ARRAY_VALIDATOR_REGEX_MAP: ValidatorMap<ZodArrayValidatorKeys>;
export declare class ExtendedDMMFFieldArrayValidatorString extends ExtendedDMMFFieldCustomValidatorString {
    readonly zodArrayValidatorString?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getZodArrayValidatorString;
    private _extractArrayPattern;
    private _getValidArrayPattern;
    private _getArrayValidatorList;
}
//# sourceMappingURL=10_extendedDMMFFieldArrayValidatorString.d.ts.map