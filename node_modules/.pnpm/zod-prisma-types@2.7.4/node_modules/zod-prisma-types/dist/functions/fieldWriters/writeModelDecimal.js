"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDecimal = void 0;
const _1 = require(".");
const writeDecimal = ({ writer, field, model, writeOptionalDefaults = false, }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: `)
        .write(`z.union([`)
        .write(`z.number(),`)
        .write(`z.string(),`)
        .write(`DecimalJSLikeSchema,`)
        .write(`]`)
        .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
        .write(`)`)
        .write(`.refine((v) => isValidDecimalInput(v),`)
        .write(` { message: "Field '${field.formattedNames.original}' must be a Decimal. Location: ['Models', '${model.formattedNames.original}']", `)
        .write(` })`);
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeDecimal = writeDecimal;
//# sourceMappingURL=writeModelDecimal.js.map