"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryHelper = void 0;
const fs_1 = __importDefault(require("fs"));
class DirectoryHelper {
    static pathExistsElseCreate(path) {
        return this.pathOrDirExists(path) || Boolean(this.createDir(path));
    }
    static createDir(path, options) {
        fs_1.default.mkdirSync(path, options || { recursive: true });
        return this.pathOrDirExists(path) ? path : undefined;
    }
    static pathOrDirExists(path) {
        return fs_1.default.existsSync(path);
    }
    static removeDir(path) {
        if (!path)
            throw new Error('No path specified');
        if (!this.pathOrDirExists(path))
            return;
        try {
            fs_1.default.rmdirSync(path, { recursive: true });
        }
        catch (err) {
            if (err instanceof Error)
                throw new Error(`Error while deleting old data in path ${path}: ${err.message}`);
        }
    }
}
exports.DirectoryHelper = DirectoryHelper;
//# sourceMappingURL=directoryHelper.js.map