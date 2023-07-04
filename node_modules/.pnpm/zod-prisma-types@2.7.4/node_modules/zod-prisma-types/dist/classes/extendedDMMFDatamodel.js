"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFDatamodel = void 0;
const extendedDMMFEnum_1 = require("./extendedDMMFEnum");
const extendedDMMFModel_1 = require("./extendedDMMFModel");
class ExtendedDMMFDatamodel {
    constructor(generatorConfig, datamodel) {
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: generatorConfig
        });
        Object.defineProperty(this, "enums", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "models", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.enums = this._getExtendedEnums(datamodel.enums);
        this.models = this._getExtendedModels(datamodel.models);
        this.types = this._getExtendedModels(datamodel.types);
    }
    _getExtendedModels(models) {
        return models.map((model) => new extendedDMMFModel_1.ExtendedDMMFModel(this.generatorConfig, model));
    }
    _getExtendedEnums(enums) {
        return enums.map((elem) => new extendedDMMFEnum_1.ExtendedDMMFEnum(this.generatorConfig, elem));
    }
}
exports.ExtendedDMMFDatamodel = ExtendedDMMFDatamodel;
//# sourceMappingURL=extendedDMMFDatamodel.js.map