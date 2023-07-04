"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFOutputType = void 0;
const objectMaps_1 = require("../constants/objectMaps");
const extendedDMMFSchemaField_1 = require("./extendedDMMFSchemaField");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFOutputType extends formattedNames_1.FormattedNames {
    constructor(generatorConfig, type, datamodel) {
        super(type.name);
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: generatorConfig
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prismaActionFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prismaOtherFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "linkedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selectImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = type.name;
        this.fieldMap = type.fieldMap;
        this.fields = this._setFields(type.fields, datamodel);
        this.prismaActionFields = this._setFields(type.fields, datamodel, 'PRISMA_ACTION');
        this.prismaOtherFields = this._setFields(type.fields, datamodel, 'OTHER_FIELDS');
        this.linkedModel = this._setLinkedModel(datamodel);
        this.selectImports = this._setSelectImports();
        this.includeImports = this._setIncludeImports();
    }
    _setLinkedModel(datamodel) {
        return datamodel.models.find((model) => {
            return this.name.match(model.name);
        });
    }
    _setFields(fields, datamodel, fieldCategory) {
        if (fieldCategory === 'PRISMA_ACTION') {
            return fields
                .filter((field) => !field.name.includes('Raw') &&
                objectMaps_1.PRISMA_ACTION_ARRAY.some((elem) => field.name.includes(elem)))
                .map((field) => new extendedDMMFSchemaField_1.ExtendedDMMFSchemaField(this.generatorConfig, field, datamodel));
        }
        if (fieldCategory === 'OTHER_FIELDS') {
            return fields
                .filter((field) => !objectMaps_1.PRISMA_ACTION_ARRAY.some((elem) => field.name.includes(elem)))
                .map((field) => new extendedDMMFSchemaField_1.ExtendedDMMFSchemaField(this.generatorConfig, field, datamodel));
        }
        return fields.map((field) => {
            return new extendedDMMFSchemaField_1.ExtendedDMMFSchemaField(this.generatorConfig, field, datamodel);
        });
    }
    _setSelectImports() {
        const imports = new Set();
        const { outputTypePath } = this.generatorConfig;
        this.fields.forEach((field) => {
            if (field.writeSelectFindManyField) {
                return imports.add(`import { ${field.outputType.type}FindManyArgsSchema } from "../${outputTypePath}/${field.outputType.type}FindManyArgsSchema"`);
            }
            if (field.writeSelectField) {
                return imports.add(`import { ${field.outputType.type}ArgsSchema } from "../${outputTypePath}/${field.outputType.type}ArgsSchema"`);
            }
            return undefined;
        });
        return imports;
    }
    _setIncludeImports() {
        const imports = new Set();
        const { outputTypePath } = this.generatorConfig;
        this.fields.forEach((field) => {
            if (field.writeIncludeFindManyField) {
                return imports.add(`import { ${field.outputType.type}FindManyArgsSchema } from "../${outputTypePath}/${field.outputType.type}FindManyArgsSchema"`);
            }
            if (field.writeIncludeField) {
                return imports.add(`import { ${field.outputType.type}ArgsSchema } from "../${outputTypePath}/${field.outputType.type}ArgsSchema"`);
            }
            return undefined;
        });
        return imports;
    }
    hasCountField() {
        return this.fields.some((field) => field.name === '_count');
    }
    hasRelationField() {
        return this.fields.some((field) => field.outputType.location === 'outputObjectTypes');
    }
    writeMongoDbInclude() {
        return (this.generatorConfig.isMongoDb &&
            this.fields.some((field) => field.isObjectOutputType()));
    }
    writeInclude() {
        return this.hasRelationField() || this.writeMongoDbInclude();
    }
    writeIncludeArgs() {
        return this.hasRelationField() || this.generatorConfig.isMongoDb;
    }
    writeCountArgs() {
        return this.hasCountField();
    }
}
exports.ExtendedDMMFOutputType = ExtendedDMMFOutputType;
//# sourceMappingURL=extendedDMMFOutputType.js.map