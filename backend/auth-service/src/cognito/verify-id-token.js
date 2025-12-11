const { CognitoJwtVerifier } = require("aws-jwt-verify");
const dotenv = require("dotenv");
const path = require("path");

// 🔹 Load backend/auth-service/.env explicitly
const envPath = path.join(process.cwd(), "backend", "auth-service", ".env");
console.log("Loading .env from:", envPath);
dotenv.config({ path: envPath });

// Debug value
console.log(
  "COGNITO_USER_POOL_ID (auth-service) =",
  JSON.stringify(process.env.COGNITO_USER_POOL_ID)
);

if (!process.env.COGNITO_USER_POOL_ID) {
  throw new Error("COGNITO_USER_POOL_ID is not set or empty in backend/auth-service/.env");
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

module.exports = { verifier };
