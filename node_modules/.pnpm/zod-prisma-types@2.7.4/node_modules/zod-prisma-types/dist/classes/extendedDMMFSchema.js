"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchema = void 0;
const _1 = require(".");
class ExtendedDMMFSchema {
    constructor(generatorConfig, schema, datamodel) {
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: generatorConfig
        });
        Object.defineProperty(this, "rootQueryType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rootMutationType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputObjectTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputObjectTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldRefTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasJsonTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasBytesTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasDecimalTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.rootQueryType = schema.rootQueryType;
        this.rootMutationType = schema.rootMutationType;
        this.enumTypes = this._setExtendedEnumTypes(schema);
        this.inputObjectTypes = this._setExtendedInputObjectTypes(schema, datamodel);
        this.outputObjectTypes = this._setExtendedOutputObjectTypes(schema, datamodel);
        this.fieldRefTypes = schema.fieldRefTypes;
        this.hasJsonTypes = this._setHasJsonTypes();
        this.hasBytesTypes = this._setHasBytesTypes();
        this.hasDecimalTypes = this._setHasDecimalTypes();
    }
    _setExtendedInputObjectTypes(schema, datamodel) {
        return {
            ...schema.inputObjectTypes,
            prisma: schema.inputObjectTypes.prisma.map((type) => new _1.ExtendedDMMFInputType(this.generatorConfig, type, datamodel)),
        };
    }
    _setExtendedOutputObjectTypes(schema, datamodel) {
        return {
            model: schema.outputObjectTypes.model.map((type) => {
                return new _1.ExtendedDMMFOutputType(this.generatorConfig, type, datamodel);
            }),
            prisma: schema.outputObjectTypes.prisma.map((type) => {
                return new _1.ExtendedDMMFOutputType(this.generatorConfig, type, datamodel);
            }),
            aggregateAndCountTypes: schema.outputObjectTypes.prisma
                .filter((type) => type.name !== 'Query' &&
                type.name !== 'Mutation' &&
                !type.name.includes('AffectedRows') &&
                !type.name.includes('RawAggregate'))
                .map((type) => new _1.ExtendedDMMFOutputType(this.generatorConfig, type, datamodel)),
            argTypes: schema.outputObjectTypes.prisma
                .filter((type) => type.name === 'Query' || type.name === 'Mutation')
                .map((type) => new _1.ExtendedDMMFOutputType(this.generatorConfig, type, datamodel)),
        };
    }
    _setExtendedEnumTypes(schema) {
        return {
            ...schema.enumTypes,
            prisma: schema.enumTypes.prisma.map((type) => new _1.ExtendedDMMFSchemaEnum(this.generatorConfig, type)),
        };
    }
    _setHasJsonTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isJsonField);
    }
    _setHasBytesTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isBytesField);
    }
    _setHasDecimalTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isDecimalField);
    }
    getModelWithIncludeAndSelect(field) {
        return this.outputObjectTypes.model.find((model) => field.modelType === model.name && field.writeSelectAndIncludeArgs);
    }
}
exports.ExtendedDMMFSchema = ExtendedDMMFSchema;
//# sourceMappingURL=extendedDMMFSchema.js.map