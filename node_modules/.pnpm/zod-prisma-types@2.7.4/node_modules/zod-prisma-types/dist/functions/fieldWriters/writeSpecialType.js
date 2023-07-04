"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSpecialType = void 0;
const writeSpecialType = (writer, { inputType, isOptional, isNullable, writeComma = true, zodCustomErrors, zodCustomValidatorString, }) => {
    if (!inputType.isSpecialType())
        return;
    if (zodCustomValidatorString &&
        inputType.generatorConfig.addInputTypeValidation) {
        return writer
            .write(zodCustomValidatorString)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (inputType.isDecimalType) {
        if (inputType.isList) {
            return writer
                .write(`z.union([`)
                .write(`z.number().array(),`)
                .write(`z.string().array(),`)
                .write(`DecimalJSLikeListSchema,`)
                .write(`]`)
                .conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors}`)
                .write(`)`)
                .write(`.refine((v) => `)
                .write(`Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),`)
                .write(` { message: 'Must be a Decimal' })`)
                .conditionalWrite(isOptional, `.optional()`)
                .conditionalWrite(isNullable, `.nullable()`)
                .conditionalWrite(writeComma, `,`);
        }
        return writer
            .write(`z.union([`)
            .write(`z.number(),`)
            .write(`z.string(),`)
            .write(`DecimalJSLikeSchema,`)
            .write(`]`)
            .conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors}`)
            .write(`)`)
            .write(`.refine((v) => isValidDecimalInput(v),`)
            .write(` { message: 'Must be a Decimal' })`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (inputType.isJsonType) {
        return writer
            .write(`InputJsonValue`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (inputType.isBytesType) {
        return writer
            .write(`z.instanceof(Buffer)`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    return writer
        .write(`z.null(),`)
        .conditionalWrite(!isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeSpecialType = writeSpecialType;
//# sourceMappingURL=writeSpecialType.js.map