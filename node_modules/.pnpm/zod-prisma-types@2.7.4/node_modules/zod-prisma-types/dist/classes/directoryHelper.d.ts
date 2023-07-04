/// <reference types="node" />
import fs from 'fs';
export type CreateDirOptions = fs.MakeDirectoryOptions & {
    recursive: true;
};
export declare class DirectoryHelper {
    static pathExistsElseCreate(path: string): boolean;
    static createDir(path: string, options?: CreateDirOptions): string | undefined;
    static pathOrDirExists(path: string): boolean;
    static removeDir(path?: string | null): void;
}
//# sourceMappingURL=directoryHelper.d.ts.map