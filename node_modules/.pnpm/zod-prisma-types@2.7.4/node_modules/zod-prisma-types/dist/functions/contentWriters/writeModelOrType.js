"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeModelOrType = void 0;
const _1 = require(".");
const fieldWriters_1 = require("../fieldWriters");
const writeModelOrType = ({ fileWriter: { writer, writeImport, writeImportSet, writeJSDoc, writeHeading, }, dmmf, getSingleFileContent = false, }, model) => {
    const { useMultipleFiles, createRelationValuesTypes, inputTypePath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
        writeImportSet(model.imports);
        if (createRelationValuesTypes && model.hasRelationFields) {
            if (model.hasOptionalJsonFields) {
                writeImport(`type { NullableJsonInput }`, `../${inputTypePath}/transformJsonNull`);
            }
            const imports = new Set();
            const typeImports = [];
            const schemaImports = [];
            model.filterdRelationFields.forEach((field) => {
                if (!dmmf.generatorConfig.isMongoDb) {
                    typeImports.push([
                        `${field.type}WithRelations`,
                        `${field.type}Schema`,
                    ]);
                    schemaImports.push([
                        `${field.type}WithRelationsSchema`,
                        `${field.type}Schema`,
                    ]);
                    if (model.writePartialTypes) {
                        typeImports.push([
                            `${field.type}PartialWithRelations`,
                            `${field.type}Schema`,
                        ]);
                        schemaImports.push([
                            `${field.type}PartialWithRelationsSchema`,
                            `${field.type}Schema`,
                        ]);
                    }
                    if (model.writeOptionalDefaultValuesTypes) {
                        typeImports.push([
                            `${field.type}OptionalDefaultsWithRelations`,
                            `${field.type}Schema`,
                        ]);
                        schemaImports.push([
                            `${field.type}OptionalDefaultsWithRelationsSchema`,
                            `${field.type}Schema`,
                        ]);
                    }
                }
                else {
                    typeImports.push([`${field.type}`, `${field.type}Schema`]);
                    schemaImports.push([`${field.type}Schema`, `${field.type}Schema`]);
                }
            });
            typeImports.forEach((type) => {
                imports.add(`import type { ${type[0]} } from './${type[1]}'`);
            });
            schemaImports.forEach((schema) => {
                imports.add(`import { ${schema[0]} } from './${schema[1]}'`);
            });
            writeImportSet(imports);
        }
    }
    writer.blankLine();
    writeHeading(`${model.formattedNames.upperCaseSpace} SCHEMA`, 'FAT');
    writer.blankLine();
    writeJSDoc(model.clearedDocumentation);
    writer
        .write(`export const ${model.name}Schema = z.object(`)
        .inlineBlock(() => {
        [...model.enumFields, ...model.scalarFields].forEach((field) => {
            writer.conditionalWrite(field.omitInModel(), '// omitted: ');
            (0, _1.writeModelFields)({
                writer,
                field,
                model,
                dmmf,
            });
        });
    })
        .write(`)`);
    writer
        .blankLine()
        .write(`export type ${model.name} = z.infer<typeof ${model.name}Schema>`);
    if (model.writePartialTypes) {
        writer.blankLine();
        writeHeading(`${model.formattedNames.upperCaseSpace} PARTIAL SCHEMA`, 'FAT');
        writer
            .blankLine()
            .write(`export const ${model.name}PartialSchema = ${model.name}Schema.partial()`);
        writer
            .blankLine()
            .write(`export type ${model.name}Partial = z.infer<typeof ${model.name}PartialSchema>`);
    }
    if (model.writeOptionalDefaultValuesTypes) {
        writer.blankLine();
        writeHeading(`${model.formattedNames.upperCaseSpace} OPTIONAL DEFAULTS SCHEMA`, useMultipleFiles ? 'FAT' : 'SLIM');
        writer
            .blankLine()
            .write(`export const ${model.name}OptionalDefaultsSchema = `)
            .write(`${model.name}Schema.merge(z.object(`)
            .inlineBlock(() => {
            [...model.enumFields, ...model.scalarFields].forEach((field) => {
                if (!field.isOptionalDefaultField)
                    return;
                const writeOptions = {
                    writer,
                    field,
                    writeOptionalDefaults: true,
                };
                writer.conditionalWrite(field.omitInModel(), '// omitted: ');
                (0, _1.writeModelFields)({
                    ...writeOptions,
                    model,
                    dmmf,
                });
            });
        })
            .write(`))`);
        writer
            .blankLine()
            .write(`export type ${model.name}OptionalDefaults = z.infer<typeof ${model.name}OptionalDefaultsSchema>`);
    }
    if (model.writeRelationValueTypes) {
        writer.blankLine();
        writeHeading(`${model.formattedNames.upperCaseSpace} RELATION SCHEMA`, useMultipleFiles ? 'FAT' : 'SLIM');
        writer
            .blankLine()
            .write(`export type ${model.name}Relations = `)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(field.name)
                    .conditionalWrite(!field.isRequired, '?')
                    .write(': ')
                    .conditionalWrite(!dmmf.generatorConfig.isMongoDb, `${field.type}WithRelations`)
                    .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
                    .conditionalWrite(field.isList, '[]')
                    .conditionalWrite(!field.isRequired, ' | null')
                    .write(';')
                    .newLine();
            });
        })
            .write(`;`)
            .blankLine();
        if (model.hasOptionalJsonFields) {
            writer
                .write(`export type ${model.name}WithRelations = Omit<z.infer<typeof ${model.name}Schema>, ${model.optionalJsonFieldUnion}> & `)
                .inlineBlock(() => {
                model.optionalJsonFields.forEach((field) => {
                    writer.write(`${field.name}?: NullableJsonInput;`).newLine();
                });
            })
                .write(` & `);
        }
        else {
            writer.write(`export type ${model.name}WithRelations = z.infer<typeof ${model.name}Schema> & `);
        }
        writer.write(`${model.name}Relations`);
        writer
            .blankLine()
            .write(`export const ${model.name}WithRelationsSchema: z.ZodType<${model.name}WithRelations> = ${model.name}Schema.merge(z.object(`)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                (0, fieldWriters_1.writeRelation)({ writer, field });
            });
        })
            .write(`))`);
    }
    if (model.writeOptionalDefaultsRelationValueTypes) {
        writer.blankLine();
        writeHeading(`${model.formattedNames.upperCaseSpace} OPTIONAL DEFAULTS RELATION SCHEMA`, useMultipleFiles ? 'FAT' : 'SLIM');
        writer
            .blankLine()
            .write(`export type ${model.name}OptionalDefaultsRelations = `)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(field.name)
                    .conditionalWrite(!field.isRequired, '?')
                    .write(': ')
                    .conditionalWrite(!dmmf.generatorConfig.isMongoDb, `${field.type}OptionalDefaultsWithRelations`)
                    .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
                    .conditionalWrite(field.isList, '[]')
                    .conditionalWrite(!field.isRequired, ' | null')
                    .write(';')
                    .newLine();
            });
        })
            .write(`;`)
            .blankLine();
        if (model.hasOptionalJsonFields) {
            writer
                .write(`export type ${model.name}OptionalDefaultsWithRelations = Omit<z.infer<typeof ${model.name}OptionalDefaultsSchema>, ${model.optionalJsonFieldUnion}> & `)
                .inlineBlock(() => {
                model.optionalJsonFields.forEach((field) => {
                    writer.write(`${field.name}?: NullableJsonInput;`).newLine();
                });
            })
                .write(` & `);
        }
        else {
            writer.write(`export type ${model.name}OptionalDefaultsWithRelations = z.infer<typeof ${model.name}OptionalDefaultsSchema> & `);
        }
        writer.write(`${model.name}OptionalDefaultsRelations`);
        writer
            .blankLine()
            .write(`export const ${model.name}OptionalDefaultsWithRelationsSchema: z.ZodType<${model.name}OptionalDefaultsWithRelations> = ${model.name}OptionalDefaultsSchema.merge(z.object(`)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                (0, fieldWriters_1.writeRelation)({
                    writer,
                    field,
                    isOptionalDefaults: true,
                });
            });
        })
            .write(`))`);
    }
    if (model.writePartialRelationValueTypes) {
        writer.blankLine();
        writeHeading(`${model.formattedNames.upperCaseSpace} PARTIAL RELATION SCHEMA`, useMultipleFiles ? 'FAT' : 'SLIM');
        writer
            .blankLine()
            .write(`export type ${model.name}PartialRelations = `)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(field.name)
                    .write('?')
                    .write(': ')
                    .conditionalWrite(!dmmf.generatorConfig.isMongoDb, `${field.type}PartialWithRelations`)
                    .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
                    .conditionalWrite(field.isList, '[]')
                    .conditionalWrite(!field.isRequired, ' | null')
                    .write(';')
                    .newLine();
            });
        })
            .write(`;`)
            .blankLine();
        if (model.hasOptionalJsonFields) {
            writer
                .write(`export type ${model.name}PartialWithRelations = Omit<z.infer<typeof ${model.name}PartialSchema>, ${model.optionalJsonFieldUnion}> & `)
                .inlineBlock(() => {
                model.optionalJsonFields.forEach((field) => {
                    writer.write(`${field.name}?: NullableJsonInput;`).newLine();
                });
            })
                .write(` & `)
                .write(`${model.name}PartialRelations`);
        }
        else {
            writer
                .write(`export type ${model.name}PartialWithRelations = z.infer<typeof ${model.name}PartialSchema> & `)
                .write(`${model.name}PartialRelations`);
        }
        writer
            .blankLine()
            .write(`export const ${model.name}PartialWithRelationsSchema: z.ZodType<${model.name}PartialWithRelations> = ${model.name}PartialSchema.merge(z.object(`)
            .inlineBlock(() => {
            model.relationFields.forEach((field) => {
                (0, fieldWriters_1.writeRelation)({ writer, field, isPartial: true });
            });
        })
            .write(`)).partial()`);
        if (model.writeOptionalDefaultsRelationValueTypes) {
            writer.blankLine();
            if (model.hasOptionalJsonFields) {
                writer
                    .write(`export type ${model.name}OptionalDefaultsWithPartialRelations = Omit<z.infer<typeof ${model.name}OptionalDefaultsSchema>, ${model.optionalJsonFieldUnion}> & `)
                    .inlineBlock(() => {
                    model.optionalJsonFields.forEach((field) => {
                        writer.write(`${field.name}?: NullableJsonInput;`).newLine();
                    });
                })
                    .write(` & `);
            }
            else {
                writer.write(`export type ${model.name}OptionalDefaultsWithPartialRelations = z.infer<typeof ${model.name}OptionalDefaultsSchema> & `);
            }
            writer.write(`${model.name}PartialRelations`);
            writer
                .blankLine()
                .write(`export const ${model.name}OptionalDefaultsWithPartialRelationsSchema: z.ZodType<${model.name}OptionalDefaultsWithPartialRelations> = ${model.name}OptionalDefaultsSchema.merge(z.object(`)
                .inlineBlock(() => {
                model.relationFields.forEach((field) => {
                    (0, fieldWriters_1.writeRelation)({
                        writer,
                        field,
                        isPartial: true,
                    });
                });
            })
                .write(`).partial())`);
        }
        if (model.writeRelationValueTypes) {
            writer.blankLine();
            if (model.hasOptionalJsonFields) {
                writer
                    .write(`export type ${model.name}WithPartialRelations = Omit<z.infer<typeof ${model.name}Schema>, ${model.optionalJsonFieldUnion}> & `)
                    .inlineBlock(() => {
                    model.optionalJsonFields.forEach((field) => {
                        writer.write(`${field.name}?: NullableJsonInput;`).newLine();
                    });
                })
                    .write(` & `);
            }
            else {
                writer.write(`export type ${model.name}WithPartialRelations = z.infer<typeof ${model.name}Schema> & `);
            }
            writer.write(`${model.name}PartialRelations`);
            writer
                .blankLine()
                .write(`export const ${model.name}WithPartialRelationsSchema: z.ZodType<${model.name}WithPartialRelations> = ${model.name}Schema.merge(z.object(`)
                .inlineBlock(() => {
                model.relationFields.forEach((field) => {
                    (0, fieldWriters_1.writeRelation)({
                        writer,
                        field,
                        isPartial: true,
                    });
                });
            })
                .write(`).partial())`);
        }
    }
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${model.name}Schema;`);
    }
};
exports.writeModelOrType = writeModelOrType;
//# sourceMappingURL=writeModelOrType.js.map