"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestFields = exports.objectParser = void 0;
const objectParser = async (existing, allFields) => {
    const testR = {};
    allFields.forEach((i) => {
        if (existing[i]) {
            testR[i] = existing[i];
        }
        else {
            testR[i] = '';
        }
    });
    return testR;
};
exports.objectParser = objectParser;
const getTestFields = async (model) => {
    return Object.keys(model.schema.paths);
};
exports.getTestFields = getTestFields;
//# sourceMappingURL=helpers.js.map