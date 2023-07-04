"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMF = void 0;
const extendedDMMFDatamodel_1 = require("./extendedDMMFDatamodel");
const extendedDMMFMappings_1 = require("./extendedDMMFMappings");
const extendedDMMFSchema_1 = require("./extendedDMMFSchema");
class ExtendedDMMF {
    constructor(dmmf, config) {
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datamodel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mappings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "imports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = this._setGeneratorConfig(config);
        this.datamodel = this._getExtendedDatamodel(dmmf);
        this.schema = this._getExtendedSchema(dmmf);
        this.mappings = this._getExtendedMappings(dmmf);
        this.imports = this._getImports();
        this.customImports = this._getCustomImports();
    }
    _getExtendedDatamodel({ datamodel }) {
        return new extendedDMMFDatamodel_1.ExtendedDMMFDatamodel(this.generatorConfig, datamodel);
    }
    _getExtendedSchema(dmmf) {
        return new extendedDMMFSchema_1.ExtendedDMMFSchema(this.generatorConfig, dmmf.schema, this.datamodel);
    }
    _getImports() {
        return new Set(this.datamodel.models.map((model) => [...model.imports]).flat());
    }
    _getCustomImports() {
        return new Set(this.datamodel.models.map((model) => [...model.customImports]).flat());
    }
    _getExtendedMappings(dmmf) {
        return new extendedDMMFMappings_1.ExtendedDMMFMappings(this.generatorConfig, dmmf.mappings);
    }
    _setGeneratorConfig(config) {
        return config;
    }
}
exports.ExtendedDMMF = ExtendedDMMF;
//# sourceMappingURL=extendedDMMF.js.map