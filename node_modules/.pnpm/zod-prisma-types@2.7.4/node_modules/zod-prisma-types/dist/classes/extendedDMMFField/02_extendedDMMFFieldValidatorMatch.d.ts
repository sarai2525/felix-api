import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldBase } from './01_extendedDMMFFieldBase';
import { GeneratorConfig } from '../../schemas';
export declare const VALIDATOR_TYPE_REGEX: RegExp;
export declare class ExtendedDMMFFieldValidatorMatch extends ExtendedDMMFFieldBase {
    protected _validatorMatch?: RegExpMatchArray;
    readonly clearedDocumentation?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getValidatorMatchArray;
    private _getClearedDocumentation;
}
//# sourceMappingURL=02_extendedDMMFFieldValidatorMatch.d.ts.map