"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoConfig = void 0;
exports.cognitoConfig = {
    region: (_a = process.env.COGNITO_REGION) !== null && _a !== void 0 ? _a : 'ap-south-1',
    userPoolId: (_b = process.env.COGNITO_USER_POOL_ID) !== null && _b !== void 0 ? _b : '',
    clientId: (_c = process.env.COGNITO_CLIENT_ID) !== null && _c !== void 0 ? _c : '',
};
//# sourceMappingURL=cognito.config.js.map