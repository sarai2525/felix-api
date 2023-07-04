"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldCustomValidatorString = void 0;
const _07_extendedDMMFFieldValidatorMap_1 = require("./07_extendedDMMFFieldValidatorMap");
const _08_extendedDMMFFieldValidatorString_1 = require("./08_extendedDMMFFieldValidatorString");
class ExtendedDMMFFieldCustomValidatorString extends _08_extendedDMMFFieldValidatorString_1.ExtendedDMMFFieldValidatorString {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "zodCustomValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.zodCustomValidatorString = this._getZodCustomValidatorString();
    }
    _getZodCustomValidatorString() {
        if (!this._validatorType || this._validatorType !== 'custom')
            return this.zodCustomValidatorString;
        return this._validatorIsValid()
            ? this._extractUsePattern()
            : this.zodCustomValidatorString;
    }
    _extractUsePattern() {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = this._getZodValidatorListWithoutArray()) === null || _a === void 0 ? void 0 : _a.find((pattern) => pattern.includes('.use'))) === null || _b === void 0 ? void 0 : _b.match(_07_extendedDMMFFieldValidatorMap_1.CUSTOM_VALIDATOR_MESSAGE_REGEX)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d['pattern'];
    }
}
exports.ExtendedDMMFFieldCustomValidatorString = ExtendedDMMFFieldCustomValidatorString;
//# sourceMappingURL=09_extendedDMMFFieldCustomValidatorString.js.map