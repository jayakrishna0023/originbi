import 'dotenv/config';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const cognitoConfig = {
  region: process.env.COGNITO_REGION!,
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  clientId: process.env.COGNITO_CLIENT_ID!,
};

const idTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: cognitoConfig.userPoolId,
  tokenUse: 'id',
  clientId: cognitoConfig.clientId,
});

export async function verifyCognitoIdToken(token: string) {
  try {
    const payload = await idTokenVerifier.verify(token);
    return payload as {
      sub: string;
      email?: string;
      [key: string]: any;
    };
  } catch (err) {
    console.error('Cognito token verification failed', err);
    throw new Error('INVALID_COGNITO_TOKEN');
  }
}
