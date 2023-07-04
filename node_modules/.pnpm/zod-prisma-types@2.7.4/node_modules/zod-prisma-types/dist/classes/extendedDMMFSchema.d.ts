import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFDatamodel, ExtendedDMMFInputType, ExtendedDMMFOutputType, ExtendedDMMFSchemaEnum, ExtendedDMMFSchemaField } from '.';
import { GeneratorConfig } from '../schemas';
export interface ExtendedDMMFSchemaOptions {
    schema: DMMF.Schema;
    datamodel: ExtendedDMMFDatamodel;
    generatorConfig: GeneratorConfig;
}
export declare class ExtendedDMMFSchema implements DMMF.Schema {
    readonly generatorConfig: GeneratorConfig;
    readonly rootQueryType?: DMMF.Schema['rootQueryType'];
    readonly rootMutationType?: DMMF.Schema['rootMutationType'];
    readonly inputObjectTypes: {
        readonly model?: DMMF.InputType[];
        readonly prisma: ExtendedDMMFInputType[];
    };
    readonly outputObjectTypes: {
        readonly model: ExtendedDMMFOutputType[];
        readonly prisma: ExtendedDMMFOutputType[];
        readonly aggregateAndCountTypes: ExtendedDMMFOutputType[];
        readonly argTypes: ExtendedDMMFOutputType[];
    };
    readonly enumTypes: {
        readonly model?: DMMF.SchemaEnum[];
        readonly prisma: ExtendedDMMFSchemaEnum[];
    };
    readonly fieldRefTypes: {
        readonly prisma?: DMMF.FieldRefType[];
    };
    readonly hasJsonTypes: boolean;
    readonly hasBytesTypes: boolean;
    readonly hasDecimalTypes: boolean;
    constructor(generatorConfig: GeneratorConfig, schema: DMMF.Schema, datamodel: ExtendedDMMFDatamodel);
    private _setExtendedInputObjectTypes;
    private _setExtendedOutputObjectTypes;
    private _setExtendedEnumTypes;
    private _setHasJsonTypes;
    private _setHasBytesTypes;
    private _setHasDecimalTypes;
    getModelWithIncludeAndSelect(field: ExtendedDMMFSchemaField): ExtendedDMMFOutputType | undefined;
}
//# sourceMappingURL=extendedDMMFSchema.d.ts.map