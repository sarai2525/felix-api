import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldOmitField } from './11_extendedDMMFFieldOmitField';
import { GeneratorConfig } from '../../schemas';
export type ZodPrimitiveType = 'string' | 'number' | 'bigint' | 'boolean' | 'date' | 'symbol' | 'undefined' | 'null' | 'void' | 'unknown' | 'never' | 'any';
export type ZodScalarType = Extract<ZodPrimitiveType, 'string' | 'number' | 'date' | 'boolean' | 'bigint' | 'unknown' | 'any'>;
export type PrismaScalarType = 'String' | 'Boolean' | 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'DateTime' | 'Json' | 'Bytes';
export type ZodPrismaScalarType = Exclude<PrismaScalarType, 'Json' | 'Bytes' | 'Decimal'>;
export declare const PRISMA_TO_ZOD_TYPE_MAP: Record<ZodPrismaScalarType, ZodScalarType>;
export declare class ExtendedDMMFFieldZodType extends ExtendedDMMFFieldOmitField {
    readonly zodType: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _setZodType;
    private _getZodTypeFromScalarType;
}
//# sourceMappingURL=12_extendedDMMFFieldZodType.d.ts.map