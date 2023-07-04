"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileHelperStatements = void 0;
const _1 = require(".");
const writeSingleFileHelperStatements = (dmmf, fileWriter) => {
    fileWriter.writer.blankLine();
    fileWriter.writeHeading('HELPER FUNCTIONS', 'FAT');
    fileWriter.writer.blankLine();
    if (dmmf.schema.hasJsonTypes) {
        fileWriter.writeHeading(`JSON`, 'SLIM');
        (0, _1.writeTransformJsonNull)({ fileWriter, dmmf });
        (0, _1.writeJsonValue)({ fileWriter, dmmf });
        (0, _1.writeNullableJsonValue)({ fileWriter, dmmf });
        (0, _1.writeInputJsonValue)({ fileWriter, dmmf });
        fileWriter.writer.newLine();
    }
    if (dmmf.schema.hasDecimalTypes) {
        fileWriter.writeHeading(`DECIMAL`, 'SLIM');
        (0, _1.writeDecimalJsLike)({ fileWriter, dmmf });
        (0, _1.writeDecimalJsLikeList)({ fileWriter, dmmf });
        (0, _1.writeIsValidDecimalInput)({ fileWriter, dmmf });
        fileWriter.writer.newLine();
    }
};
exports.writeSingleFileHelperStatements = writeSingleFileHelperStatements;
//# sourceMappingURL=writeSingleFileHelperStatements.js.map