import CodeBlockWriter, { type Options } from 'code-block-writer';
export interface FileWriterOptions {
    writerOptions?: Options;
}
export interface writeConstStatementOptions {
    name: string;
    type: string;
}
export interface CreateFileOptions {
    writer: CodeBlockWriter;
    writeImport: (importName: string, importPath: string) => void;
    writeImportSet: (strings: Set<string>) => void;
    writeExport: (importName: string, importPath: string) => void;
    writeImports: (imports: string[]) => void;
    writeHeading: (headline: string, type?: 'SLIM' | 'FAT') => void;
    writeJSDoc: (documentation?: string) => void;
}
export interface CreateFileComplexOptions {
    path: string;
    imports: Set<string>;
    name?: string;
    type?: string;
    defaultExport?: string;
    content: (writer: CodeBlockWriter) => void;
}
export declare class FileWriter {
    readonly writer: CodeBlockWriter;
    constructor(options?: FileWriterOptions);
    createPath(path: string): string | undefined;
    createFile(path: string, writerFn: (options: CreateFileOptions) => void): void;
    writeImport(importName: string, importPath: string): void;
    writeImportSet(strings: Set<string>): void;
    writeHeading(heading: string, type?: 'SLIM' | 'FAT'): CodeBlockWriter;
    writeJSDoc(doc?: string): void;
    writeExport(exportName: string, exportPath: string): void;
    writeImports(imports?: string[]): void;
}
//# sourceMappingURL=fileWriter.d.ts.map