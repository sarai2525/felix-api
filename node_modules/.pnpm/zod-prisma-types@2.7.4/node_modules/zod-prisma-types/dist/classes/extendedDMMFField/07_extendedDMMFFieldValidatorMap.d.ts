import { ExtendedDMMFFieldValidatorCustomErrors } from './06_extendedDMMFFieldValidatorCustomErrors';
import { ZodValidatorType } from './03_extendedDMMFFieldValidatorType';
export type ZodArrayValidatorKeys = 'array';
export type ZodStringValidatorKeys = ZodArrayValidatorKeys | 'max' | 'min' | 'length' | 'email' | 'url' | 'emoji' | 'uuid' | 'cuid' | 'cuid2' | 'ulid' | 'regex' | 'includes' | 'startsWith' | 'endsWith' | 'datetime' | 'ip' | 'trim' | 'toLowerCase' | 'toUpperCase' | 'noDefault';
export type ZodNumberValidatorKeys = ZodArrayValidatorKeys | 'min' | 'max' | 'gt' | 'gte' | 'lt' | 'lte' | 'int' | 'positive' | 'nonpositive' | 'negative' | 'nonnegative' | 'multipleOf' | 'step' | 'finite' | 'noDefault';
export type ZodDateValidatorKeys = ZodArrayValidatorKeys | 'min' | 'max';
export type ZodBigIntValidatorKeys = ZodArrayValidatorKeys | 'gt' | 'gte' | 'lt' | 'lte' | 'positive' | 'nonpositive' | 'negative' | 'nonnegative' | 'multipleOf';
export type ZodCustomValidatorKeys = ZodArrayValidatorKeys | 'use' | 'omit';
export interface ScalarValidatorFnOpts {
    key: string;
    pattern: string;
}
export type ValidatorFn = (opts: ScalarValidatorFnOpts) => boolean;
export type ValidatorFunctionMap = Record<ZodValidatorType, ValidatorFn>;
export type ValidatorMap<TKeys extends string> = Record<TKeys, RegExp>;
export declare const VALIDATOR_KEY_REGEX: RegExp;
export declare const STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX: RegExp;
export declare const STRING_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const STRING_VALIDATOR_REGEX: RegExp;
export declare const STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX: RegExp;
export declare const NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX: RegExp;
export declare const NUMBER_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX: RegExp;
export declare const BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX: RegExp;
export declare const BIGINT_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const CUSTOM_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const ARRAY_VALIDATOR_MESSAGE_REGEX: RegExp;
export declare const STRING_VALIDATOR_REGEX_MAP: ValidatorMap<ZodStringValidatorKeys>;
export declare const NUMBER_VALIDATOR_REGEX_MAP: ValidatorMap<ZodNumberValidatorKeys>;
export declare const DATE_VALIDATOR_REGEX_MAP: ValidatorMap<ZodDateValidatorKeys>;
export declare const BIGINT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodBigIntValidatorKeys>;
export declare const CUSTOM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodCustomValidatorKeys>;
export declare const ENUM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodArrayValidatorKeys>;
export declare const OBJECT_VALIDATOR_REGEX_MAP: ValidatorMap<ZodArrayValidatorKeys>;
export declare class ExtendedDMMFFieldValidatorMap extends ExtendedDMMFFieldValidatorCustomErrors {
    protected _validatorMap: ValidatorFunctionMap;
    protected _validateRegexInMap: <TKeys extends string>(validationMap: ValidatorMap<TKeys>, { pattern, key }: ScalarValidatorFnOpts) => boolean;
    protected _validatePatternInMap(opts: ScalarValidatorFnOpts): boolean;
    protected _getValidatorKeyFromPattern(pattern: string): string;
    protected _validatorIsValid(): boolean;
}
//# sourceMappingURL=07_extendedDMMFFieldValidatorMap.d.ts.map