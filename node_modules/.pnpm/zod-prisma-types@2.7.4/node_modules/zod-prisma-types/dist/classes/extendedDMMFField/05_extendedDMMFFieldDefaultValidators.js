"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldDefaultValidators = void 0;
const _04_extendedDMMFFieldValidatorPattern_1 = require("./04_extendedDMMFFieldValidatorPattern");
class ExtendedDMMFFieldDefaultValidators extends _04_extendedDMMFFieldValidatorPattern_1.ExtendedDMMFFieldValidatorPattern {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_defaultValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._defaultValidatorString = this._setZodDefaultValidator();
        this._validatorList = this._updateValidatorList();
    }
    _setZodDefaultValidator() {
        var _a;
        if (!this.generatorConfig.useDefaultValidators)
            return;
        if ((_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.includes('.noDefault()'))
            return;
        if (this._isCuid())
            return '.cuid()';
        if (this._isUuid())
            return '.uuid()';
        if (this._isInt())
            return '.int()';
        return undefined;
    }
    _isCuid() {
        if (this._IsFieldDefault(this.default))
            return this.default.name === 'cuid';
        return false;
    }
    _isUuid() {
        if (this._IsFieldDefault(this.default))
            return this.default.name === 'uuid';
        return false;
    }
    _isInt() {
        return this.type === 'Int';
    }
    _IsFieldDefault(value) {
        return (value === null || value === void 0 ? void 0 : value.name) !== undefined;
    }
    _updateValidatorList() {
        if (!this._validatorList)
            return;
        const filterdList = this._validatorList.filter((validator) => !validator.includes('.noDefault()'));
        if (filterdList.length < 1) {
            return undefined;
        }
        return filterdList;
    }
}
exports.ExtendedDMMFFieldDefaultValidators = ExtendedDMMFFieldDefaultValidators;
//# sourceMappingURL=05_extendedDMMFFieldDefaultValidators.js.map