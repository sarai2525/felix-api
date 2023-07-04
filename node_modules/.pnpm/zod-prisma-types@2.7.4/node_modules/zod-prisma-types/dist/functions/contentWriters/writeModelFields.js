"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeModelFields = void 0;
const __1 = require("..");
const writeModelFields = (options) => {
    if (options.field.clearedDocumentation) {
        (0, __1.writeJsDoc)(options.writer, options.field.clearedDocumentation);
    }
    if (options.field.zodCustomValidatorString) {
        return (0, __1.writeCustomValidator)(options);
    }
    if (options.field.kind === 'enum') {
        return (0, __1.writeEnum)(options);
    }
    if (options.field.isJsonType) {
        return (0, __1.writeJson)(options);
    }
    if (options.field.isBytesType) {
        return (0, __1.writeBytes)(options);
    }
    if (options.field.isDecimalType) {
        return (0, __1.writeDecimal)(options);
    }
    return (0, __1.writeScalar)(options);
};
exports.writeModelFields = writeModelFields;
//# sourceMappingURL=writeModelFields.js.map