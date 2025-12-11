"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifier = void 0;
const aws_jwt_verify_1 = require("aws-jwt-verify");
const dotenv = require("dotenv");
const path = require("path");
const envPath = path.join(process.cwd(), "backend", "auth-service", ".env");
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });
console.log("COGNITO_USER_POOL_ID (auth-service) =", JSON.stringify(process.env.COGNITO_USER_POOL_ID));
if (!process.env.COGNITO_USER_POOL_ID) {
    throw new Error("COGNITO_USER_POOL_ID is not set or empty in backend/auth-service/.env");
}
exports.verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.COGNITO_CLIENT_ID,
});
//# sourceMappingURL=verify-id-token.js.map