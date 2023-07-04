"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRelation = void 0;
const _1 = require(".");
const writeRelation = ({ writer, field, writeOptionalDefaults = false, isPartial = false, isOptionalDefaults = false, }) => {
    const isMongoDb = field.generatorConfig.provider === 'mongodb';
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.name}: `)
        .conditionalWrite(!isMongoDb && !isPartial && !isOptionalDefaults, `z.lazy(() => ${field.type}WithRelationsSchema)`)
        .conditionalWrite(!isMongoDb && isPartial, `z.lazy(() => ${field.type}PartialWithRelationsSchema)`)
        .conditionalWrite(!isMongoDb && isOptionalDefaults, `z.lazy(() => ${field.type}OptionalDefaultsWithRelationsSchema)`)
        .conditionalWrite(isMongoDb, `z.lazy(() => ${field.type}Schema)`);
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeRelation = writeRelation;
//# sourceMappingURL=writeModelRelation.js.map