import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldValidatorMatch } from './02_extendedDMMFFieldValidatorMatch';
import { GeneratorConfig } from '../../schemas';
import { PrismaScalarType } from '../../types';
export type ZodValidatorType = 'string' | 'number' | 'bigint' | 'date' | 'custom' | 'enum' | 'object';
export declare const PRISMA_SCALAR_TO_VALIDATOR_TYPE_MAP: Record<ZodValidatorType, PrismaScalarType[]>;
export declare class ExtendedDMMFFieldValidatorType extends ExtendedDMMFFieldValidatorMatch {
    protected _validatorType?: ZodValidatorType;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _setValidatorType;
    private _checkValidatorType;
    private _getZodValidatorType;
    private _isZodValidatorType;
    private _isEnumValidatorType;
    private _isObjectValidatorType;
    private _isPrismaValidatorType;
}
//# sourceMappingURL=03_extendedDMMFFieldValidatorType.d.ts.map