"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFEnum = void 0;
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFEnum extends formattedNames_1.FormattedNames {
    constructor(generatorConfig, enums) {
        super(enums.name);
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: generatorConfig
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "documentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = enums.name;
        this.values = enums.values;
        this.dbName = enums.dbName;
        this.documentation = enums.documentation;
    }
}
exports.ExtendedDMMFEnum = ExtendedDMMFEnum;
//# sourceMappingURL=extendedDMMFEnum.js.map