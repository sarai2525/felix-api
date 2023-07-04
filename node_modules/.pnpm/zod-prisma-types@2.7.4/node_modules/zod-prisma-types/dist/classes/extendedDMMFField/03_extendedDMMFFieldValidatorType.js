"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorType = exports.PRISMA_SCALAR_TO_VALIDATOR_TYPE_MAP = void 0;
const _02_extendedDMMFFieldValidatorMatch_1 = require("./02_extendedDMMFFieldValidatorMatch");
exports.PRISMA_SCALAR_TO_VALIDATOR_TYPE_MAP = {
    string: ['String'],
    number: ['Float', 'Int'],
    bigint: ['BigInt'],
    date: ['DateTime'],
    custom: [
        'String',
        'Boolean',
        'Int',
        'BigInt',
        'Float',
        'Decimal',
        'DateTime',
        'Json',
        'Bytes',
    ],
    enum: [],
    object: [],
};
class ExtendedDMMFFieldValidatorType extends _02_extendedDMMFFieldValidatorMatch_1.ExtendedDMMFFieldValidatorMatch {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isEnumValidatorType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (validatorType) => {
                return validatorType === 'enum' && this.kind === 'enum';
            }
        });
        Object.defineProperty(this, "_isObjectValidatorType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (validatorType) => {
                return validatorType === 'object' && this.kind === 'object';
            }
        });
        this._validatorType = this._setValidatorType();
    }
    _setValidatorType() {
        var _a, _b;
        if (!((_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['type']))
            return;
        return this._checkValidatorType(this._validatorMatch.groups['type']);
    }
    _checkValidatorType(validatorType) {
        const zodValidatorType = this._getZodValidatorType(validatorType);
        if (this._isEnumValidatorType(zodValidatorType))
            return zodValidatorType;
        if (this._isObjectValidatorType(zodValidatorType))
            return zodValidatorType;
        if (this._isPrismaValidatorType(zodValidatorType))
            return zodValidatorType;
        throw new Error(`[@zod generator error]: Validator '${validatorType}' is not valid for type '${this.type}'. ${this._errorLocation}`);
    }
    _getZodValidatorType(validatorType) {
        if (this._isZodValidatorType(validatorType))
            return validatorType;
        throw new Error(`[@zod generator error]: '${validatorType}' is not a valid validator type. ${this._errorLocation}`);
    }
    _isZodValidatorType(type) {
        return /string|number|bigint|date|custom|enum|object/.test(type);
    }
    _isPrismaValidatorType(validatorType) {
        var _a;
        return (_a = exports.PRISMA_SCALAR_TO_VALIDATOR_TYPE_MAP[validatorType]) === null || _a === void 0 ? void 0 : _a.includes(this.type);
    }
}
exports.ExtendedDMMFFieldValidatorType = ExtendedDMMFFieldValidatorType;
//# sourceMappingURL=03_extendedDMMFFieldValidatorType.js.map