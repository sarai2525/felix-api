import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFModel } from '.';
import { GeneratorConfig } from '../schemas';
import { ExtendedDMMFDatamodel } from './extendedDMMFDatamodel';
import { ExtendedDMMFSchemaField } from './extendedDMMFSchemaField';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFOutputType extends FormattedNames implements DMMF.OutputType {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.OutputType['name'];
    readonly fields: ExtendedDMMFSchemaField[];
    readonly fieldMap?: DMMF.OutputType['fieldMap'];
    readonly prismaActionFields: ExtendedDMMFSchemaField[];
    readonly prismaOtherFields: ExtendedDMMFSchemaField[];
    readonly linkedModel?: ExtendedDMMFModel;
    readonly selectImports: Set<string>;
    readonly includeImports: Set<string>;
    constructor(generatorConfig: GeneratorConfig, type: DMMF.OutputType, datamodel: ExtendedDMMFDatamodel);
    private _setLinkedModel;
    private _setFields;
    private _setSelectImports;
    private _setIncludeImports;
    hasCountField(): boolean;
    hasRelationField(): boolean;
    writeMongoDbInclude(): boolean;
    writeInclude(): boolean;
    writeIncludeArgs(): boolean;
    writeCountArgs(): boolean;
}
//# sourceMappingURL=extendedDMMFOutputType.d.ts.map