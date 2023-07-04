import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldArrayValidatorString } from './10_extendedDMMFFieldArrayValidatorString';
import { GeneratorConfig } from '../../schemas';
export type OmitFieldMode = 'model' | 'input' | 'all' | 'none';
export declare const CUSTOM_VALIDATOR_VALID_MODE_REGEX: RegExp;
export declare class ExtendedDMMFFieldOmitField extends ExtendedDMMFFieldArrayValidatorString {
    readonly zodOmitField: OmitFieldMode;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getZodOmitFieldString;
    private _extractOmitFieldMode;
    private _getOmitFieldModes;
    omitInModel(): boolean;
    omitInInputTypes(inputTypeName: string): boolean;
    isOmitField(): boolean;
}
//# sourceMappingURL=11_extendedDMMFFieldOmitField.d.ts.map