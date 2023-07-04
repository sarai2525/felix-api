import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldValidatorType } from './03_extendedDMMFFieldValidatorType';
import { GeneratorConfig } from '../../schemas';
export declare class ExtendedDMMFFieldValidatorPattern extends ExtendedDMMFFieldValidatorType {
    protected _validatorPattern?: string;
    protected _validatorList?: string[];
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getValidatorPattern;
    private _getValidatorList;
    protected _getSplitIndices(string: string): number[];
    protected _isWordChar(char: string): boolean;
    protected _getPatternListFromSplitIndices(patternString: string, splitIndices: number[]): string[];
    protected _getZodValidatorListWithoutArray(): string[] | undefined;
    protected _getZodValidatorListArray(): string[] | undefined;
}
//# sourceMappingURL=04_extendedDMMFFieldValidatorPattern.d.ts.map