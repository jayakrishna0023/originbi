"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCognitoIdToken = verifyCognitoIdToken;
// backend/auth-service/src/cognito/verify-id-token.ts
const aws_jwt_verify_1 = require("aws-jwt-verify");
const cognito_config_1 = require("./cognito.config");
const idTokenVerifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: cognito_config_1.cognitoConfig.userPoolId,
    tokenUse: 'id', // we expect ID token
    clientId: cognito_config_1.cognitoConfig.clientId,
});
async function verifyCognitoIdToken(token) {
    try {
        const payload = await idTokenVerifier.verify(token);
        // payload has: sub, email, name, etc.
        return payload;
    }
    catch (err) {
        console.error('Cognito token verification failed', err);
        throw new Error('INVALID_COGNITO_TOKEN');
    }
}
//# sourceMappingURL=verify-id-token.js.map