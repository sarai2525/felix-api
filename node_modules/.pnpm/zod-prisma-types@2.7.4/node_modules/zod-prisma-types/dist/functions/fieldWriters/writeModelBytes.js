"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBytes = void 0;
const _1 = require(".");
const writeBytes = ({ writer, field, writeOptionalDefaults = false, }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: `)
        .write(`z.instanceof(Buffer)`);
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeBytes = writeBytes;
//# sourceMappingURL=writeModelBytes.js.map