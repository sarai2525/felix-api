import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFEnum extends FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly name: string;
    readonly values: DMMF.EnumValue[];
    readonly dbName?: string | null;
    readonly documentation?: string;
    constructor(generatorConfig: GeneratorConfig, enums: DMMF.DatamodelEnum);
}
//# sourceMappingURL=extendedDMMFEnum.d.ts.map