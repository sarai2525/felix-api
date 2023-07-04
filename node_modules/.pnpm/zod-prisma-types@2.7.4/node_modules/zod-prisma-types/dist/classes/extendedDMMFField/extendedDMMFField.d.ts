import { DMMF } from '@prisma/generator-helper';
import { OmitFieldMode } from './11_extendedDMMFFieldOmitField';
import { ExtendedDMMFFieldZodType } from './12_extendedDMMFFieldZodType';
import { GeneratorConfig } from '../../schemas';
import { FormattedNames } from '../formattedNames';
export interface ExtendedDMMFField extends DMMF.Field, FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly isNullable: boolean;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly isOptionalOnDefaultValue: boolean;
    readonly isOptionalDefaultField: boolean;
    readonly clearedDocumentation?: string;
    readonly zodValidatorString?: string;
    readonly zodCustomErrors?: string;
    readonly zodCustomValidatorString?: string;
    readonly zodArrayValidatorString?: string;
    readonly zodOmitField: OmitFieldMode;
    readonly zodType: string;
    omitInModel(): boolean;
    omitInInputTypes(inputTypeName: string): boolean;
    isOmitField(): boolean;
}
export declare class ExtendedDMMFFieldClass extends ExtendedDMMFFieldZodType implements ExtendedDMMFField {
}
//# sourceMappingURL=extendedDMMFField.d.ts.map