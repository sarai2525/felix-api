"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldOmitField = exports.CUSTOM_VALIDATOR_VALID_MODE_REGEX = void 0;
const _10_extendedDMMFFieldArrayValidatorString_1 = require("./10_extendedDMMFFieldArrayValidatorString");
const _07_extendedDMMFFieldValidatorMap_1 = require("./07_extendedDMMFFieldValidatorMap");
const constants_1 = require("../../constants");
exports.CUSTOM_VALIDATOR_VALID_MODE_REGEX = /model|input/;
class ExtendedDMMFFieldOmitField extends _10_extendedDMMFFieldArrayValidatorString_1.ExtendedDMMFFieldArrayValidatorString {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "zodOmitField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'none'
        });
        this.zodOmitField = this._getZodOmitFieldString();
    }
    _getZodOmitFieldString() {
        if (!this._validatorType || this._validatorType !== 'custom')
            return this.zodOmitField;
        return this._validatorIsValid()
            ? this._extractOmitFieldMode()
            : this.zodOmitField;
    }
    _extractOmitFieldMode() {
        const omitFieldModes = this._getOmitFieldModes();
        omitFieldModes === null || omitFieldModes === void 0 ? void 0 : omitFieldModes.forEach((field) => {
            if (!exports.CUSTOM_VALIDATOR_VALID_MODE_REGEX.test(field))
                throw new Error(`[@zod generator error]: unknown key '${field}' in '.omit()'. only 'model' and 'input' are allowed. ${this._errorLocation}`);
        });
        if (!omitFieldModes) {
            return 'none';
        }
        if (omitFieldModes.length === 2) {
            return 'all';
        }
        return omitFieldModes[0].trim();
    }
    _getOmitFieldModes() {
        var _a, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = (_a = this._getZodValidatorListWithoutArray()) === null || _a === void 0 ? void 0 : _a.find((pattern) => pattern.includes('.omit'))) === null || _b === void 0 ? void 0 : _b.match(_07_extendedDMMFFieldValidatorMap_1.CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d['pattern']) === null || _e === void 0 ? void 0 : _e.match(/[\w]+/g);
    }
    omitInModel() {
        return this.zodOmitField === 'model' || this.zodOmitField === 'all';
    }
    omitInInputTypes(inputTypeName) {
        const isInputType = constants_1.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS.test(inputTypeName);
        return (isInputType &&
            (this.zodOmitField === 'input' || this.zodOmitField === 'all'));
    }
    isOmitField() {
        return this.zodOmitField !== 'none';
    }
}
exports.ExtendedDMMFFieldOmitField = ExtendedDMMFFieldOmitField;
//# sourceMappingURL=11_extendedDMMFFieldOmitField.js.map