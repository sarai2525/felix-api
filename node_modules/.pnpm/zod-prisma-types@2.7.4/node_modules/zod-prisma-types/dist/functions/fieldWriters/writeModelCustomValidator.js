"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCustomValidator = void 0;
const _1 = require(".");
const writeCustomValidator = ({ writer, field, writeOptionalDefaults = false, }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: `)
        .write(field.zodCustomValidatorString);
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeCustomValidator = writeCustomValidator;
//# sourceMappingURL=writeModelCustomValidator.js.map