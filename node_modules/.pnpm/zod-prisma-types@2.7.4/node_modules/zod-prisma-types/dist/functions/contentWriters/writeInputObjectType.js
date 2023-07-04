"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInputObjectType = void 0;
const __1 = require("..");
const writeInputTypeField = ({ writer, field, writeComma = false, writeValidation = false, }) => {
    const { isNullable, isOptional, zodCustomErrors, zodValidatorString, zodCustomValidatorString, } = field;
    if (field.zodOmitField) {
        writer.write(`// omitted: `);
    }
    writer.write(`${field.name}: `);
    if (field.hasMultipleTypes) {
        writer.write(`z.union([ `);
        field.inputTypes.forEach((inputType, idx) => {
            const writeComma = idx !== field.inputTypes.length - 1;
            (0, __1.writeScalarType)(writer, {
                inputType,
                zodCustomErrors,
                zodValidatorString,
                zodCustomValidatorString,
                writeComma,
                writeValidation,
            });
            (0, __1.writeNonScalarType)(writer, {
                inputType,
                writeComma,
            });
            (0, __1.writeSpecialType)(writer, {
                inputType,
                zodCustomErrors,
                zodCustomValidatorString,
                writeComma,
                writeValidation,
            });
        });
        writer
            .write(` ])`)
            .conditionalWrite(!field.isRequired, `.optional()`)
            .conditionalWrite(field.isNullable, `.nullable()`)
            .write(`,`);
    }
    else {
        const inputType = field.inputTypes[0];
        (0, __1.writeScalarType)(writer, {
            inputType,
            isNullable,
            isOptional,
            zodCustomErrors,
            zodValidatorString,
            zodCustomValidatorString,
            writeValidation,
            writeComma,
        });
        (0, __1.writeNonScalarType)(writer, {
            inputType,
            isNullable,
            isOptional,
            writeComma,
        });
        (0, __1.writeSpecialType)(writer, {
            inputType,
            zodCustomErrors,
            zodCustomValidatorString,
            isNullable,
            isOptional,
            writeValidation,
            writeComma,
        });
    }
    writer.newLine();
};
const writeInputObjectType = ({ fileWriter: { writer, writeImportSet }, dmmf, getSingleFileContent = false, }, inputType) => {
    const { useMultipleFiles, addInputTypeValidation } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImportSet(inputType.imports);
    }
    const type = inputType.hasOmitFields()
        ? `z.ZodType<Omit<Prisma.${inputType.name}, ${inputType.getOmitFieldsUnion()}>>`
        : `z.ZodType<Prisma.${inputType.name}>`;
    writer.blankLine().write(`export const ${inputType.name}Schema: ${type} = `);
    const { extendedWhereUniqueFields } = inputType;
    const writeExtendedWhereUniqueInput = Array.isArray(extendedWhereUniqueFields) &&
        extendedWhereUniqueFields.length !== 0;
    if (writeExtendedWhereUniqueInput) {
        if (extendedWhereUniqueFields.length === 1) {
            writer
                .write(`z.object(`)
                .inlineBlock(() => {
                extendedWhereUniqueFields[0].forEach((field, idx) => {
                    writeInputTypeField({
                        writer,
                        field,
                        writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
                        writeValidation: addInputTypeValidation,
                    });
                });
            })
                .write(`)`)
                .newLine()
                .write(`.and(`);
        }
        else {
            writer
                .write(`z.union([`)
                .newLine()
                .withIndentationLevel(1, () => {
                extendedWhereUniqueFields.forEach((field) => {
                    writer
                        .write(`z.object(`)
                        .inlineBlock(() => {
                        field.forEach((field, idx) => {
                            writeInputTypeField({
                                writer,
                                field,
                                writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
                                writeValidation: addInputTypeValidation,
                            });
                        });
                    })
                        .write(`),`)
                        .newLine();
                });
            })
                .writeLine(`])`)
                .write(`.and(`);
        }
    }
    writer
        .write(`z.object(`)
        .inlineBlock(() => {
        inputType.fields.forEach((field) => {
            writeInputTypeField({
                writer,
                field,
                writeValidation: addInputTypeValidation,
                writeComma: field !== inputType.fields[inputType.fields.length - 1],
            });
        });
    })
        .conditionalWrite(!writeExtendedWhereUniqueInput, `).strict();`)
        .conditionalWrite(writeExtendedWhereUniqueInput, `).strict());`);
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${inputType.name}Schema;`);
    }
};
exports.writeInputObjectType = writeInputObjectType;
//# sourceMappingURL=writeInputObjectType.js.map