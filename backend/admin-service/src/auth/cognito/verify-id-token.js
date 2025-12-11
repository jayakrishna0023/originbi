const { CognitoJwtVerifier } = require("aws-jwt-verify");
const dotenv = require("dotenv");

// ✅ Load .env from the folder where you run "node ..."
dotenv.config();

// Debug: what is the value?
console.log("COGNITO_USER_POOL_ID =", JSON.stringify(process.env.COGNITO_USER_POOL_ID));

if (!process.env.COGNITO_USER_POOL_ID) {
  throw new Error("COGNITO_USER_POOL_ID is not set or empty in .env");
}

// ✅ Create verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID, // no "as string" here, JS only
  tokenUse: "id",
  clientId: process.env.COGNITO_CLIENT_ID,
});

module.exports = { verifier };
