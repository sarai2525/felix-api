"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorMap = exports.OBJECT_VALIDATOR_REGEX_MAP = exports.ENUM_VALIDATOR_REGEX_MAP = exports.CUSTOM_VALIDATOR_REGEX_MAP = exports.BIGINT_VALIDATOR_REGEX_MAP = exports.DATE_VALIDATOR_REGEX_MAP = exports.NUMBER_VALIDATOR_REGEX_MAP = exports.STRING_VALIDATOR_REGEX_MAP = exports.ARRAY_VALIDATOR_MESSAGE_REGEX = exports.CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX = exports.CUSTOM_VALIDATOR_MESSAGE_REGEX = exports.BIGINT_VALIDATOR_MESSAGE_REGEX = exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = exports.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = exports.NUMBER_VALIDATOR_MESSAGE_REGEX = exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = exports.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX = exports.STRING_VALIDATOR_REGEX = exports.STRING_VALIDATOR_MESSAGE_REGEX = exports.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = exports.VALIDATOR_KEY_REGEX = void 0;
const _06_extendedDMMFFieldValidatorCustomErrors_1 = require("./06_extendedDMMFFieldValidatorCustomErrors");
exports.VALIDATOR_KEY_REGEX = /(\.(?<validatorKey>[\w]+))/;
exports.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = /.(?<validator>min|max|length)\((?<number>[\d]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.STRING_VALIDATOR_MESSAGE_REGEX = /.(?<validator>email|url|emoji|uuid|cuid|cuid2|ulid|ip|toLowerCase|toUpperCase|trim|datetime|noDefault)(\((?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\))/u;
exports.STRING_VALIDATOR_REGEX = /.(regex)(\((?<message>.*)\))/;
exports.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX = /.(?<validator>startsWith|endsWith|includes)\((?<string>['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"])([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = /.(?<validator>min|max|gt|gte|lt|lte|multipleOf|step)\((?<number>[\d.]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.NUMBER_VALIDATOR_MESSAGE_REGEX = /.(?<validator>int|positive|nonnegative|negative|nonpositive|finite|noDefault)(\((?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\))/u;
exports.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = /.(?<validator>min|max)(\()(?<date>(new Date\((['"()\w.-]+)?\)))([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = /.(?<validator>gt|gte|lt|lte|multipleOf)\((?<number>[\w]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.BIGINT_VALIDATOR_MESSAGE_REGEX = /.(?<validator>positive|nonnegative|negative|nonpositive|array)(\((?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\))/u;
exports.CUSTOM_VALIDATOR_MESSAGE_REGEX = /(?<validator>use|array|omit)(\()(?<pattern>[\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),.'"。、:+\-*#!§$%&/{}[\]=?~><°^]+)\)/u;
exports.CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX = /(?<validator>omit)(\()(?<pattern>[\w ,'"[\]]+)\)/;
exports.ARRAY_VALIDATOR_MESSAGE_REGEX = /(?<validator>array)(\((?<pattern>[\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),.'"。、:+\-*#!§$%&/{}[\]=?~><°^]+)\))/u;
exports.STRING_VALIDATOR_REGEX_MAP = {
    max: exports.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    min: exports.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    length: exports.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    email: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    url: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    emoji: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    uuid: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    cuid: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    cuid2: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    ulid: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    regex: exports.STRING_VALIDATOR_REGEX,
    includes: exports.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    startsWith: exports.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    endsWith: exports.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    datetime: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    ip: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    trim: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    toLowerCase: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    toUpperCase: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    noDefault: exports.STRING_VALIDATOR_MESSAGE_REGEX,
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.NUMBER_VALIDATOR_REGEX_MAP = {
    gt: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    min: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    gte: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lt: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lte: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    multipleOf: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    step: exports.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    int: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    positive: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonpositive: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    negative: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonnegative: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    finite: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    noDefault: exports.NUMBER_VALIDATOR_MESSAGE_REGEX,
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.DATE_VALIDATOR_REGEX_MAP = {
    min: exports.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: exports.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.BIGINT_VALIDATOR_REGEX_MAP = {
    gt: exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    gte: exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lt: exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lte: exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    positive: exports.BIGINT_VALIDATOR_MESSAGE_REGEX,
    nonpositive: exports.BIGINT_VALIDATOR_MESSAGE_REGEX,
    negative: exports.BIGINT_VALIDATOR_MESSAGE_REGEX,
    nonnegative: exports.BIGINT_VALIDATOR_MESSAGE_REGEX,
    multipleOf: exports.BIGINT_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.CUSTOM_VALIDATOR_REGEX_MAP = {
    use: exports.CUSTOM_VALIDATOR_MESSAGE_REGEX,
    omit: exports.CUSTOM_OMIT_VALIDATOR_MESSAGE_REGEX,
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.ENUM_VALIDATOR_REGEX_MAP = {
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
exports.OBJECT_VALIDATOR_REGEX_MAP = {
    array: exports.ARRAY_VALIDATOR_MESSAGE_REGEX,
};
class ExtendedDMMFFieldValidatorMap extends _06_extendedDMMFFieldValidatorCustomErrors_1.ExtendedDMMFFieldValidatorCustomErrors {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_validatorMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                string: (options) => this._validateRegexInMap(exports.STRING_VALIDATOR_REGEX_MAP, options),
                number: (options) => this._validateRegexInMap(exports.NUMBER_VALIDATOR_REGEX_MAP, options),
                date: (options) => this._validateRegexInMap(exports.DATE_VALIDATOR_REGEX_MAP, options),
                bigint: (options) => this._validateRegexInMap(exports.BIGINT_VALIDATOR_REGEX_MAP, options),
                custom: (options) => this._validateRegexInMap(exports.CUSTOM_VALIDATOR_REGEX_MAP, options),
                enum: (options) => this._validateRegexInMap(exports.ENUM_VALIDATOR_REGEX_MAP, options),
                object: (options) => this._validateRegexInMap(exports.OBJECT_VALIDATOR_REGEX_MAP, options),
            }
        });
        Object.defineProperty(this, "_validateRegexInMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (validationMap, { pattern, key }) => {
                const validate = validationMap[key];
                if (!validate) {
                    throw new Error(`[@zod generator error]: Validator '${key}' is not valid for type '${this.type}', for specified '@zod.[key] or for 'z.array.[key]'. ${this._errorLocation}`);
                }
                if (validate.test(pattern)) {
                    return true;
                }
                throw new Error(`[@zod generator error]: Could not match validator '${key}' with validatorPattern '${pattern}'. Please check for typos! ${this._errorLocation}`);
            }
        });
    }
    _validatePatternInMap(opts) {
        if (this._validatorType) {
            return this._validatorMap[this._validatorType](opts);
        }
        throw new Error(`[@zod generator error]: Validator '${opts.key}' is not valid for type '${this.type}'. ${this._errorLocation}`);
    }
    _getValidatorKeyFromPattern(pattern) {
        var _a, _b;
        const key = (_b = (_a = pattern.match(exports.VALIDATOR_KEY_REGEX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorKey'];
        if (key) {
            return key;
        }
        throw new Error(`[@zod generator error]: no matching validator key found in '${pattern}'. ${this._errorLocation}`);
    }
    _validatorIsValid() {
        var _a;
        return Boolean((_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.every((pattern) => this._validatePatternInMap({
            pattern,
            key: this._getValidatorKeyFromPattern(pattern),
        })));
    }
}
exports.ExtendedDMMFFieldValidatorMap = ExtendedDMMFFieldValidatorMap;
//# sourceMappingURL=07_extendedDMMFFieldValidatorMap.js.map