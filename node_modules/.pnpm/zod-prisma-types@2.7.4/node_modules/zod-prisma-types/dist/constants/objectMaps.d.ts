import { FormattedNames } from '../classes/formattedNames';
import { PrismaAction, PrismaScalarType, ZodCustomErrorKey, ZodCustomValidatorKeys, ZodDateValidatorKeys, ZodNumberValidatorKeys, ZodPrismaScalarType, ZodScalarType, ZodStringValidatorKeys, ZodValidatorType } from '../types';
export declare const PRISMA_TO_VALIDATOR_TYPE_MAP: Record<ZodValidatorType | 'custom', PrismaScalarType[]>;
export declare const PRISMA_TO_ZOD_TYPE_MAP: Record<ZodPrismaScalarType, ZodScalarType>;
export declare const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[];
export type ValidatorMapValue = RegExp | ((pattern: string) => string | undefined);
export type ValidatorMap<TKeys extends string> = Record<TKeys, ValidatorMapValue>;
export declare const STRING_VALIDATOR_REGEX_MAP: ValidatorMap<ZodStringValidatorKeys>;
export declare const NUMBER_VALIDATOR_REGEX_MAP: ValidatorMap<ZodNumberValidatorKeys>;
export declare const DATE_VALIDATOR_REGEX_MAP: ValidatorMap<ZodDateValidatorKeys>;
export declare const CUSTOM_VALIDATOR_REGEX_MAP: ValidatorMap<ZodCustomValidatorKeys>;
export type FilterdPrismaAction = Exclude<PrismaAction, 'executeRaw' | 'queryRaw' | 'count'>;
export declare const PRISMA_ACTION_ARG_MAP: Record<FilterdPrismaAction, FormattedNames>;
export declare const PRISMA_ACTION_ARRAY: FilterdPrismaAction[];
//# sourceMappingURL=objectMaps.d.ts.map