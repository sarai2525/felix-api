"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchemaEnum = void 0;
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFSchemaEnum extends formattedNames_1.FormattedNames {
    constructor(generatorConfig, enumType) {
        super(enumType.name);
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
        Object.defineProperty(this, "useNativeEnum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = enumType.name;
        this.values = enumType.values;
        this.useNativeEnum = this._setUseNativeEnum();
    }
    _setUseNativeEnum() {
        return !this.name.includes('JsonNullValue');
    }
}
exports.ExtendedDMMFSchemaEnum = ExtendedDMMFSchemaEnum;
//# sourceMappingURL=extendedDMMFSchemaEnum.js.map