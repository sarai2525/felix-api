"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = void 0;
const code_block_writer_1 = __importDefault(require("code-block-writer"));
const fs_1 = __importDefault(require("fs"));
const directoryHelper_1 = require("./directoryHelper");
class FileWriter {
    constructor(options) {
        Object.defineProperty(this, "writer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.writer = new code_block_writer_1.default((options === null || options === void 0 ? void 0 : options.writerOptions) || {
            indentNumberOfSpaces: 2,
            useSingleQuote: true,
        });
    }
    createPath(path) {
        if (directoryHelper_1.DirectoryHelper.pathOrDirExists(path)) {
            return path;
        }
        return directoryHelper_1.DirectoryHelper.createDir(path);
    }
    createFile(path, writerFn) {
        writerFn({
            writer: this.writer,
            writeImport: this.writeImport.bind(this),
            writeImportSet: this.writeImportSet.bind(this),
            writeExport: this.writeExport.bind(this),
            writeImports: this.writeImports.bind(this),
            writeHeading: this.writeHeading.bind(this),
            writeJSDoc: this.writeJSDoc.bind(this),
        });
        fs_1.default.writeFileSync(path, this.writer.toString());
    }
    writeImport(importName, importPath) {
        this.writer.writeLine(`import ${importName} from '${importPath}';`);
    }
    writeImportSet(strings) {
        if (strings.size > 0) {
            strings.forEach((importString) => {
                this.writer.writeLine(importString);
            });
        }
    }
    writeHeading(heading, type = 'SLIM') {
        if (type === 'SLIM') {
            return (this.writer
                .writeLine(`// ${heading}`)
                .writeLine('//------------------------------------------------------'));
        }
        return (this.writer
            .writeLine('/////////////////////////////////////////')
            .writeLine(`// ${heading}`)
            .writeLine('/////////////////////////////////////////'));
    }
    writeJSDoc(doc) {
        if (!doc)
            return;
        this.writer.writeLine(`/**`);
        doc.split(/\n\r?/).forEach((line) => {
            this.writer.writeLine(` * ${line.trim()}`);
        });
        this.writer.writeLine(` */`);
    }
    writeExport(exportName, exportPath) {
        this.writer.writeLine(`export ${exportName} from '${exportPath}';`);
    }
    writeImports(imports = []) {
        new Set(imports).forEach((importString) => {
            this.writer.writeLine(importString);
        });
    }
}
exports.FileWriter = FileWriter;
//# sourceMappingURL=fileWriter.js.map