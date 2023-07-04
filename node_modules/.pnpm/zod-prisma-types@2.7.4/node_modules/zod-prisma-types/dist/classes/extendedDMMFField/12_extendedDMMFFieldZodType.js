"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldZodType = exports.PRISMA_TO_ZOD_TYPE_MAP = void 0;
const _11_extendedDMMFFieldOmitField_1 = require("./11_extendedDMMFFieldOmitField");
exports.PRISMA_TO_ZOD_TYPE_MAP = {
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'date',
    Int: 'number',
    BigInt: 'bigint',
    Float: 'number',
};
class ExtendedDMMFFieldZodType extends _11_extendedDMMFFieldOmitField_1.ExtendedDMMFFieldOmitField {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "zodType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.zodType = this._setZodType();
    }
    _setZodType() {
        if (this.kind === 'scalar')
            return this._getZodTypeFromScalarType();
        return this.type;
    }
    _getZodTypeFromScalarType() {
        return (exports.PRISMA_TO_ZOD_TYPE_MAP[this.type] || this.type);
    }
}
exports.ExtendedDMMFFieldZodType = ExtendedDMMFFieldZodType;
//# sourceMappingURL=12_extendedDMMFFieldZodType.js.map