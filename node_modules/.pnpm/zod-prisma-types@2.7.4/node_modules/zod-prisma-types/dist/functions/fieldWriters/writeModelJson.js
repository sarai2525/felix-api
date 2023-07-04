"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = void 0;
const writeJson = ({ writer, field }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: `)
        .conditionalWrite(field.isRequired, `InputJsonValue`)
        .conditionalWrite(!field.isRequired, `NullableJsonValue`)
        .conditionalWrite(field.isList, `.array()`)
        .conditionalWrite(!field.isRequired, `.optional()`)
        .write(`,`)
        .newLine();
};
exports.writeJson = writeJson;
//# sourceMappingURL=writeModelJson.js.map