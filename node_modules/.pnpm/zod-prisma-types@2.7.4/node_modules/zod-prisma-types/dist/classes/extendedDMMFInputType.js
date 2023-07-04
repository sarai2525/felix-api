"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFInputType = void 0;
const extendedDMMFSchemaArg_1 = require("./extendedDMMFSchemaArg");
const formattedNames_1 = require("./formattedNames");
const regex_1 = require("../constants/regex");
const SPLIT_NAME_REGEX = /Unchecked|Create|Update|CreateMany|UpdateMany|Upsert|Where|WhereUnique|OrderBy|ScalarWhere|Aggregate|GroupBy/g;
class ExtendedDMMFInputType extends formattedNames_1.FormattedNames {
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
        Object.defineProperty(this, "constraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "meta", {
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
        Object.defineProperty(this, "linkedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isJsonField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isBytesField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isDecimalField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "omitFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "imports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isWhereUniqueInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "extendedWhereUniqueFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = type.name;
        this.linkedModel = this._setLinkedModel(datamodel);
        this.constraints = type.constraints;
        this.meta = type.meta;
        this.fields = this._setFields(type.fields);
        this.fieldMap = type.fieldMap;
        this.isJsonField = this._setIsJsonField();
        this.isBytesField = this._setIsBytesField();
        this.isDecimalField = this._setIsDecimalField();
        this.omitFields = this._setOmitFields();
        this.imports = this._setImports();
        this.extendedWhereUniqueFields = this._setExtendedWhereUniqueFields(type.fields);
    }
    _setLinkedModel(datamodel) {
        return datamodel.models.find((model) => {
            return model.name === this.name.split(SPLIT_NAME_REGEX)[0];
        });
    }
    _setFields(fields) {
        return fields.map((field) => {
            var _a;
            const linkedField = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((modelField) => modelField.name === field.name);
            const optionalValidators = this._fieldIsPrismaFunctionType()
                ? {
                    zodValidatorString: this._getZodValidatorString(field.name),
                    zodCustomErrors: this._getZodCustomErrorsString(field.name),
                    zodCustomValidatorString: this._getZodCustomValidatorString(field.name),
                    zodOmitField: this._getZodOmitField(linkedField),
                }
                : undefined;
            return new extendedDMMFSchemaArg_1.ExtendedDMMFSchemaArg(this.generatorConfig, { ...field, ...optionalValidators }, linkedField);
        });
    }
    _fieldIsPrismaFunctionType() {
        if (!this.generatorConfig.useMultipleFiles ||
            this.generatorConfig.validateWhereUniqueInput) {
            return regex_1.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE.test(this.name);
        }
        return regex_1.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS.test(this.name);
    }
    _getZodValidatorString(fieldName) {
        var _a, _b;
        return (_b = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName)) === null || _b === void 0 ? void 0 : _b.zodValidatorString;
    }
    _getZodCustomErrorsString(fieldName) {
        var _a, _b;
        return (_b = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName)) === null || _b === void 0 ? void 0 : _b.zodCustomErrors;
    }
    _getZodCustomValidatorString(fieldName) {
        var _a, _b;
        return (_b = (_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName)) === null || _b === void 0 ? void 0 : _b.zodCustomValidatorString;
    }
    _getZodOmitField(linkedField) {
        if (!linkedField)
            return undefined;
        const shouldOmitField = linkedField.zodOmitField === 'input' ||
            linkedField.zodOmitField === 'all';
        return shouldOmitField;
    }
    _setIsJsonField() {
        return this.fields.some((field) => field.isJsonType);
    }
    _setIsBytesField() {
        return this.fields.some((field) => field.isBytesType);
    }
    _setIsDecimalField() {
        return this.fields.some((field) => field.isDecimalType);
    }
    _setOmitFields() {
        return this.fields
            .filter((field) => field.zodOmitField)
            .map((field) => field.name);
    }
    _setImports() {
        var _a;
        const { prismaClientPath } = this.generatorConfig;
        const prismaImport = `import type { Prisma } from '${prismaClientPath}';`;
        const zodImport = "import { z } from 'zod';";
        const fieldImports = [
            prismaImport,
            zodImport,
            ...this.fields.map((field) => field.getImports(this.name)).flat(),
        ];
        if (this._fieldIsPrismaFunctionType() && ((_a = this.linkedModel) === null || _a === void 0 ? void 0 : _a.customImports)) {
            fieldImports.push(...this.linkedModel.customImports);
        }
        return new Set(fieldImports);
    }
    _getExtendedWhereUniqueFieldCombinations(arr) {
        const result = [];
        function combine(start, soFar) {
            if (soFar.length === arr.length) {
                result.push(soFar.slice());
                return;
            }
            combine(start + 1, [...soFar, { ...arr[start], isRequired: true }]);
            combine(start + 1, [...soFar, { ...arr[start], isRequired: false }]);
        }
        combine(0, []);
        return result;
    }
    _setExtendedWhereUniqueFields(fields) {
        if (!this.constraints.fields || !this.name.includes('WhereUniqueInput')) {
            return undefined;
        }
        const extendedWhereUniqueFields = this.constraints.fields
            .map((fieldName) => {
            return fields.find((field) => field.name === fieldName);
        })
            .filter((field) => field !== undefined);
        const combinations = this._getExtendedWhereUniqueFieldCombinations(extendedWhereUniqueFields);
        const filteredCombinations = combinations.filter((combination) => !combination.every((field) => !field.isRequired));
        const extendedFilterdCombinations = filteredCombinations.map((combination) => {
            return combination.filter((field) => field.isRequired);
        });
        return extendedFilterdCombinations.map((combination) => {
            return this._setFields(combination);
        });
    }
    hasOmitFields() {
        return this.omitFields.length > 0;
    }
    getOmitFieldsUnion() {
        return this.omitFields.map((field) => `"${field}"`).join(' | ');
    }
}
exports.ExtendedDMMFInputType = ExtendedDMMFInputType;
//# sourceMappingURL=extendedDMMFInputType.js.map