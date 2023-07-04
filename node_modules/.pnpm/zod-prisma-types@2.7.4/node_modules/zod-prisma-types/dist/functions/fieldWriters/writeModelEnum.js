"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeEnum = void 0;
const _1 = require(".");
const writeEnum = ({ writer, field, writeOptionalDefaults = false, }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: `)
        .write(`${field.zodType}Schema`);
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeEnum = writeEnum;
//# sourceMappingURL=writeModelEnum.js.map