type ObjectWithRequiredProperty<T> = T & {
    isRequired: boolean;
};
export declare function getAllBoolCombinations<T extends Record<string, any>>(arr: ObjectWithRequiredProperty<T>[]): ObjectWithRequiredProperty<T>[][];
export {};
//# sourceMappingURL=getAllBoolCombinations.d.ts.map