"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeScalar = void 0;
const _1 = require(".");
const writeScalar = ({ writer, field, writeOptionalDefaults = false, }) => {
    if (field.type === 'DateTime') {
        writer
            .write(`${field.name}: `)
            .conditionalWrite(!field.generatorConfig.coerceDate, `z.${field.zodType}(`)
            .conditionalWrite(field.generatorConfig.coerceDate, `z.coerce.${field.zodType}(`)
            .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
            .write(`)`)
            .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString);
        (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
    }
    else {
        writer
            .write(`${field.name}: `)
            .write(`z.${field.zodType}(`)
            .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
            .write(`)`)
            .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString);
        (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
    }
};
exports.writeScalar = writeScalar;
//# sourceMappingURL=writeModelScalar.js.map