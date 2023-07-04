"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeScalarType = void 0;
const writeScalarType = (writer, { inputType, isOptional, isNullable, writeComma = true, zodCustomErrors, zodValidatorString, zodCustomValidatorString, writeValidation = true, }) => {
    const zodType = inputType.getZodScalarType();
    if (!zodType)
        return;
    if (zodCustomValidatorString) {
        if (zodType === 'date') {
            return writer
                .conditionalWrite(inputType.generatorConfig.addInputTypeValidation, zodCustomValidatorString)
                .conditionalWrite(!inputType.generatorConfig.addInputTypeValidation &&
                !inputType.generatorConfig.coerceDate, `z.${zodType}()`)
                .conditionalWrite(!inputType.generatorConfig.addInputTypeValidation &&
                inputType.generatorConfig.coerceDate, `z.coerce.${zodType}()`)
                .conditionalWrite(inputType.isList, `.array()`)
                .conditionalWrite(isOptional, `.optional()`)
                .conditionalWrite(isNullable, `.nullable()`)
                .conditionalWrite(writeComma, `,`);
        }
        return writer
            .conditionalWrite(inputType.generatorConfig.addInputTypeValidation, zodCustomValidatorString)
            .conditionalWrite(!inputType.generatorConfig.addInputTypeValidation, `z.${zodType}()`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (zodType === 'date') {
        return writer
            .conditionalWrite(!inputType.generatorConfig.coerceDate, `z.${zodType}(`)
            .conditionalWrite(inputType.generatorConfig.coerceDate, `z.coerce.${zodType}(`)
            .conditionalWrite(writeValidation && !!zodCustomErrors, zodCustomErrors)
            .write(`)`)
            .conditionalWrite(writeValidation && !!zodValidatorString, zodValidatorString)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    return writer
        .write(`z.${zodType}(`)
        .conditionalWrite(writeValidation && !!zodCustomErrors, zodCustomErrors)
        .write(`)`)
        .conditionalWrite(writeValidation && !!zodValidatorString, zodValidatorString)
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeScalarType = writeScalarType;
//# sourceMappingURL=writeScalarType.js.map