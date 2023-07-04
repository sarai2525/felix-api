"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorString = void 0;
const _07_extendedDMMFFieldValidatorMap_1 = require("./07_extendedDMMFFieldValidatorMap");
class ExtendedDMMFFieldValidatorString extends _07_extendedDMMFFieldValidatorMap_1.ExtendedDMMFFieldValidatorMap {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "zodValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.zodValidatorString = this._getZodValidatorString();
    }
    _getZodValidatorString() {
        if (!this._validatorType || this._validatorType === 'custom')
            return this._defaultValidatorString;
        return this._validatorIsValid()
            ? this._getZodValidatorStringWithoutArray()
            : this.zodValidatorString;
    }
    _getZodValidatorStringWithoutArray() {
        var _a;
        return (_a = this._getZodValidatorListWithoutArray()) === null || _a === void 0 ? void 0 : _a.join('');
    }
}
exports.ExtendedDMMFFieldValidatorString = ExtendedDMMFFieldValidatorString;
//# sourceMappingURL=08_extendedDMMFFieldValidatorString.js.map