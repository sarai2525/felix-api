"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorPattern = void 0;
const _03_extendedDMMFFieldValidatorType_1 = require("./03_extendedDMMFFieldValidatorType");
class ExtendedDMMFFieldValidatorPattern extends _03_extendedDMMFFieldValidatorType_1.ExtendedDMMFFieldValidatorType {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorPattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_validatorList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorPattern = this._getValidatorPattern();
        this._validatorList = this._getValidatorList();
    }
    _getValidatorPattern() {
        var _a, _b;
        if (!this._validatorMatch)
            return;
        return (_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorPattern'];
    }
    _getValidatorList() {
        if (!this._validatorPattern)
            return;
        const splitIndices = this._getSplitIndices(this._validatorPattern);
        return this._getPatternListFromSplitIndices(this._validatorPattern, splitIndices);
    }
    _getSplitIndices(string) {
        const splitIndices = [0];
        let depth = 0;
        [...string].forEach((char, idx) => {
            var _a;
            if (!depth && !this._isWordChar(char)) {
                const splitPosition = (_a = string.substring(0, idx).match(/\.\w+$/)) === null || _a === void 0 ? void 0 : _a.index;
                if (splitPosition)
                    splitIndices.push(splitPosition);
            }
            if (char === '(')
                depth++;
            if (char === ')')
                depth--;
        });
        return splitIndices;
    }
    _isWordChar(char) {
        return /[\w]/.test(char);
    }
    _getPatternListFromSplitIndices(patternString, splitIndices) {
        return splitIndices
            .map((splitIndex, idx) => patternString.substring(splitIndex, splitIndices[idx + 1]))
            .filter((str) => !!str);
    }
    _getZodValidatorListWithoutArray() {
        var _a;
        return (_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.filter((elem) => !elem.includes('.array'));
    }
    _getZodValidatorListArray() {
        var _a;
        return (_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.filter((elem) => elem.includes('.array'));
    }
}
exports.ExtendedDMMFFieldValidatorPattern = ExtendedDMMFFieldValidatorPattern;
//# sourceMappingURL=04_extendedDMMFFieldValidatorPattern.js.map