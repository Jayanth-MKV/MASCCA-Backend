"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = void 0;
const crypto = require("crypto");
async function generateRandomToken() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}
exports.generateRandomToken = generateRandomToken;
//# sourceMappingURL=random-token.js.map