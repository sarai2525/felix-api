"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorCustomErrors = exports.ZOD_VALID_ERROR_KEYS = exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX = exports.VALIDATOR_CUSTOM_ERROR_REGEX = void 0;
const _05_extendedDMMFFieldDefaultValidators_1 = require("./05_extendedDMMFFieldDefaultValidators");
exports.VALIDATOR_CUSTOM_ERROR_REGEX = /(\()(?<object>\{(?<messages>[\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),'"。、:+\-*#!§$%&/{}[\]=?~><°^]+)\})(\))/u;
exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX = /[ ]?"[\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),.':+\-*#!§$%&/{}[\]=?~><°^]+"[,]?[ ]?/gu;
exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = /[\w]+(?=:)/gu;
exports.ZOD_VALID_ERROR_KEYS = [
    'invalid_type_error',
    'required_error',
    'description',
];
class ExtendedDMMFFieldValidatorCustomErrors extends _05_extendedDMMFFieldDefaultValidators_1.ExtendedDMMFFieldDefaultValidators {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorCustomError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodCustomErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorCustomError = this._setValidatorCustomError();
        this.zodCustomErrors = this._setZodCustomErrors();
    }
    _setValidatorCustomError() {
        var _a, _b;
        if (!this._validatorMatch)
            return;
        return (_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['customErrors'];
    }
    _setZodCustomErrors() {
        var _a;
        if (!this._validatorCustomError)
            return;
        const match = this._validatorCustomError.match(exports.VALIDATOR_CUSTOM_ERROR_REGEX);
        if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a['messages']))
            return;
        return this._customErrorMessagesValid(match.groups['messages'])
            ? match.groups['object']
            : undefined;
    }
    _customErrorMessagesValid(messages) {
        const customErrorKeysArray = messages
            .replace(exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
            .match(exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);
        const isValid = customErrorKeysArray === null || customErrorKeysArray === void 0 ? void 0 : customErrorKeysArray.every((key) => {
            if (exports.ZOD_VALID_ERROR_KEYS === null || exports.ZOD_VALID_ERROR_KEYS === void 0 ? void 0 : exports.ZOD_VALID_ERROR_KEYS.includes(key))
                return true;
            throw new Error(`[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${this._errorLocation}`);
        });
        return Boolean(isValid);
    }
}
exports.ExtendedDMMFFieldValidatorCustomErrors = ExtendedDMMFFieldValidatorCustomErrors;
//# sourceMappingURL=06_extendedDMMFFieldValidatorCustomErrors.js.map