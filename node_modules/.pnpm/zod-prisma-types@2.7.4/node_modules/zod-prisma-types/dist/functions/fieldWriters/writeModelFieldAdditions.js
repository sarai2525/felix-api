"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFieldAdditions = void 0;
const writeFieldAdditions = ({ writer, field, writeOptionalDefaults = false, }) => {
    const { writeNullishInModelTypes } = field.generatorConfig;
    writer
        .conditionalWrite(field.isList, `.array()`)
        .conditionalWrite(!!field.zodArrayValidatorString, field.zodArrayValidatorString)
        .conditionalWrite(field.isNullable &&
        !field.isOptionalOnDefaultValue &&
        !writeNullishInModelTypes, `.nullable()`)
        .conditionalWrite(field.isNullable &&
        !field.isOptionalOnDefaultValue &&
        writeNullishInModelTypes, `.nullish()`)
        .conditionalWrite(writeOptionalDefaults && field.isOptionalOnDefaultValue, `.optional()`)
        .write(`,`)
        .newLine();
};
exports.writeFieldAdditions = writeFieldAdditions;
//# sourceMappingURL=writeModelFieldAdditions.js.map