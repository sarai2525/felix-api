"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsDoc = void 0;
const writeJsDoc = (writer, jsDoc) => {
    if (!jsDoc)
        return;
    writer.writeLine(`/**`);
    jsDoc.split(/\n\r?/).forEach((line) => {
        writer.writeLine(` * ${line.trim()}`);
    });
    writer.writeLine(` */`);
};
exports.writeJsDoc = writeJsDoc;
//# sourceMappingURL=writeJsDoc.js.map