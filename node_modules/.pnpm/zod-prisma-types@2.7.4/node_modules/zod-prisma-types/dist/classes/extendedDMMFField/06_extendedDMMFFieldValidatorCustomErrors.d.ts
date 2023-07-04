import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldDefaultValidators } from './05_extendedDMMFFieldDefaultValidators';
import { GeneratorConfig } from '../../schemas';
export type ZodCustomErrorKey = 'invalid_type_error' | 'required_error' | 'description';
export declare const VALIDATOR_CUSTOM_ERROR_REGEX: RegExp;
export declare const VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX: RegExp;
export declare const VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX: RegExp;
export declare const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[];
export declare class ExtendedDMMFFieldValidatorCustomErrors extends ExtendedDMMFFieldDefaultValidators {
    protected _validatorCustomError?: string;
    readonly zodCustomErrors?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _setValidatorCustomError;
    private _setZodCustomErrors;
    private _customErrorMessagesValid;
}
//# sourceMappingURL=06_extendedDMMFFieldValidatorCustomErrors.d.ts.map