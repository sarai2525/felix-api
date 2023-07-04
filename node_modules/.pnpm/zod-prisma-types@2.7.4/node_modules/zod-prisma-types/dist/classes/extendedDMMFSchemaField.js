"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchemaField = void 0;
const extendedDMMFSchemaArg_1 = require("./extendedDMMFSchemaArg");
const formattedNames_1 = require("./formattedNames");
const objectMaps_1 = require("../constants/objectMaps");
const OMIT_FIELDS_REGEX = /create|upsert|update|delete/;
const OMIT_FIELDS_UNION_REGEX = /create|update|upsert|delete|data/;
const WRITE_INCLUDE_SELECT_FIELDS_REGEX = /findUnique|findUniqueOrThrow|findFirst|findFirstOrThrow|findMany|create|update|upsert|delete/;
const WRITE_NO_INCLUDE_SELECT_FIELDS_REGEX = /createMany|updateMany|deleteMany/;
class ExtendedDMMFSchemaField extends formattedNames_1.FormattedNames {
    constructor(generatorConfig, field, datamodel) {
        super(field.name);
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
        Object.defineProperty(this, "isNullable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deprecation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "documentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prismaAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelType", {
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
        Object.defineProperty(this, "hasOmitFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argTypeImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeSelectFindManyField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeSelectField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeIncludeFindManyField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeIncludeField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeSelectAndIncludeArgs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customArgType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeSelectArg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeIncludeArg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = field.name;
        this.isNullable = field.isNullable;
        this.outputType = field.outputType;
        this.deprecation = field.deprecation;
        this.documentation = field.documentation;
        this.writeSelectAndIncludeArgs = this._setWriteSelectAndIncludeArgs();
        this.writeSelectFindManyField = this._setWriteSelectFindManyField();
        this.writeSelectField = this._setWriteSelectField();
        this.writeIncludeFindManyField = this._setWriteIncludeFindManyField();
        this.writeIncludeField = this._setWriteIncludeField();
        this.prismaAction = this._setMatchedPrismaAction();
        this.modelType = this._setModelType();
        this.argName = this._setArgName();
        this.linkedModel = this._setLinkedModel(datamodel);
        this.args = this._setArgs(field);
        this.hasOmitFields = this._setHasOmitFields();
        this.writeSelectArg = this._setWriteSelectArg();
        this.writeIncludeArg = this._setWriteIncludeArg();
        this.argTypeImports = this._setArgTypeImports();
        this.customArgType = this._setCustomArgType();
    }
    testOutputType() {
        return this.outputType.namespace === 'model';
    }
    _setArgs({ args }) {
        return args.map((arg) => {
            var _a;
            const linkedField = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => (field === null || field === void 0 ? void 0 : field.name) === (arg === null || arg === void 0 ? void 0 : arg.name));
            return new extendedDMMFSchemaArg_1.ExtendedDMMFSchemaArg(this.generatorConfig, arg, linkedField);
        });
    }
    _setMatchedPrismaAction() {
        return objectMaps_1.PRISMA_ACTION_ARRAY.find((elem) => this.name.includes(elem));
    }
    _setModelType() {
        return this.name
            .replace(this.prismaAction, '')
            .replace('OrThrow', '');
    }
    _setArgName() {
        const argName = objectMaps_1.PRISMA_ACTION_ARG_MAP[this.prismaAction];
        if (this.name.includes('OrThrow')) {
            return `${this.modelType}${argName === null || argName === void 0 ? void 0 : argName.formattedNames.pascalCase}OrThrowArgs`;
        }
        if (!argName)
            return;
        return `${this.modelType}${argName.formattedNames.pascalCase}Args`;
    }
    _setLinkedModel(datamodel) {
        return datamodel.models.find((model) => {
            return typeof this.modelType === 'string'
                ? this.modelType === model.name
                : false;
        });
    }
    _setHasOmitFields() {
        var _a;
        const writeOmit = OMIT_FIELDS_REGEX.test(this.name);
        if (writeOmit)
            return Boolean((_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.hasOmitFields);
        return false;
    }
    _setArgTypeImports() {
        const { prismaClientPath } = this.generatorConfig;
        const prismaImport = `import type { Prisma } from '${prismaClientPath}';`;
        const imports = ["import { z } from 'zod';", prismaImport];
        if (this.writeIncludeArg) {
            imports.push(`import { ${this.modelType}IncludeSchema } from '../${this.generatorConfig.inputTypePath}/${this.modelType}IncludeSchema'`);
        }
        this.args.forEach((arg) => {
            if (arg.hasMultipleTypes) {
                return arg.inputTypes.forEach((inputType) => {
                    imports.push(`import { ${inputType.type}Schema } from '../${this.generatorConfig.inputTypePath}/${inputType.type}Schema'`);
                });
            }
            return imports.push(`import { ${arg.inputTypes[0].type}Schema } from '../${this.generatorConfig.inputTypePath}/${arg.inputTypes[0].type}Schema'`);
        });
        return new Set(imports.filter((imp) => !imp.includes('IntSchema') && !imp.includes('BooleanSchema')));
    }
    _setWriteSelectFindManyField() {
        return (this.isObjectOutputType() &&
            this.isListOutputType() &&
            !this.generatorConfig.isMongoDb);
    }
    _setWriteSelectField() {
        return this.isObjectOutputType();
    }
    _setWriteIncludeFindManyField() {
        return (this.isObjectOutputType() &&
            this.isListOutputType() &&
            !this.generatorConfig.isMongoDb);
    }
    _setWriteIncludeField() {
        return this.isObjectOutputType() && !this.generatorConfig.isMongoDb;
    }
    _setWriteSelectAndIncludeArgs() {
        return (WRITE_INCLUDE_SELECT_FIELDS_REGEX.test(this.name) &&
            !WRITE_NO_INCLUDE_SELECT_FIELDS_REGEX.test(this.name));
    }
    _setWriteSelectArg() {
        return (this._setWriteSelectAndIncludeArgs() && this.generatorConfig.addSelectType);
    }
    _setWriteIncludeArg() {
        var _a;
        return (this._setWriteSelectAndIncludeArgs() &&
            Boolean((_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.hasRelationFields) &&
            this.generatorConfig.addIncludeType);
    }
    _shouldAddOmittedFieldsToOmitUnionArray() {
        return (this.hasOmitFields &&
            this.args.some((arg) => OMIT_FIELDS_UNION_REGEX.test(arg.name)));
    }
    _shouldAddIncludeOrSelectToOmitUnion() {
        return (this._setWriteSelectAndIncludeArgs() &&
            (!this.generatorConfig.addIncludeType ||
                !this.generatorConfig.addSelectType));
    }
    _shouldAddIncludeToOmitUnionArray() {
        var _a;
        return (this._setWriteSelectAndIncludeArgs() &&
            this._setWriteIncludeField() &&
            !this.generatorConfig.addIncludeType &&
            ((_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.hasRelationFields));
    }
    _shouldAddSelectToOmitUnionArray() {
        return (this._setWriteSelectAndIncludeArgs() &&
            this._setWriteSelectField() &&
            !this.generatorConfig.addSelectType);
    }
    _getOmitFieldsUnion(omitUnionArray) {
        return omitUnionArray.join(' | ');
    }
    _addOmittedFieldsToOmitUnionArray(omitUnionArray) {
        this.args.forEach((arg) => {
            if (OMIT_FIELDS_UNION_REGEX.test(arg.name))
                omitUnionArray.push(`"${arg.name}"`);
        });
    }
    _setCustomArgType() {
        const omitUnionArray = [];
        if (this._shouldAddSelectToOmitUnionArray()) {
            omitUnionArray.push('"select"');
        }
        if (this._shouldAddIncludeToOmitUnionArray()) {
            omitUnionArray.push('"include"');
        }
        if (this._shouldAddOmittedFieldsToOmitUnionArray()) {
            this._addOmittedFieldsToOmitUnionArray(omitUnionArray);
            return `z.ZodType<Omit<Prisma.${this.argName}, ${this._getOmitFieldsUnion(omitUnionArray)}> & { ${this._getTypeForCustomArgsType()} }>`;
        }
        if (this._shouldAddIncludeOrSelectToOmitUnion()) {
            return `z.ZodType<Omit<Prisma.${this.argName}, ${this._getOmitFieldsUnion(omitUnionArray)}>>`;
        }
        return `z.ZodType<Prisma.${this.argName}>`;
    }
    _getTypeForCustomArgsType() {
        return this.args
            .map((arg) => {
            if (arg.rewriteArgWithNewType()) {
                return (this._getCustomArgsFieldName(arg) + this._getCustomArgsType(arg));
            }
            return undefined;
        })
            .filter((arg) => arg !== undefined)
            .join(', ');
    }
    _getCustomArgsFieldName(arg) {
        return `${arg.name}${arg.isRequired ? '' : '?'}: `;
    }
    _getCustomArgsType(arg) {
        return arg.hasMultipleTypes
            ? this._getCustomArgsMultipleTypes(arg)
            : this._getCustomArgsSingleType(arg);
    }
    _getCustomArgsMultipleTypes(arg) {
        return arg.inputTypes
            .map((inputType) => {
            return `z.infer<typeof ${inputType.type}Schema>${inputType.isList ? '[]' : ''}`;
        })
            .join(' | ');
    }
    _getCustomArgsSingleType(arg) {
        if (arg.inputTypes[0].isList) {
            return `z.infer<typeof ${arg.inputTypes[0].type}Schema>[]`;
        }
        return `z.infer<typeof ${arg.inputTypes[0].type}Schema>`;
    }
    isEnumOutputType() {
        var _a;
        return ((_a = this.outputType) === null || _a === void 0 ? void 0 : _a.location) === 'enumTypes';
    }
    isListOutputType() {
        return this.outputType.isList;
    }
    isObjectOutputType() {
        var _a;
        return ((_a = this.outputType) === null || _a === void 0 ? void 0 : _a.location) === 'outputObjectTypes';
    }
    isScalarOutputType() {
        var _a;
        return ((_a = this.outputType) === null || _a === void 0 ? void 0 : _a.location) === 'scalar';
    }
    isCountField() {
        return this.name.includes('_count');
    }
}
exports.ExtendedDMMFSchemaField = ExtendedDMMFSchemaField;
//# sourceMappingURL=extendedDMMFSchemaField.js.map