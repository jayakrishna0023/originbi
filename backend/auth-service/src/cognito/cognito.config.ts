// backend/auth-service/src/cognito/cognito.config.ts
/*export const cognitoConfig = {
  userPoolId: 'ap-south-1_ysb2qFXrb',    // <-- fill from AWS Cognito
  clientId:  '5irno605169eg55eq3abouj91i', // <-- your app client ID
  region:    'ap-south-1',
};*/


export const cognitoConfig = {
  region: process.env.COGNITO_REGION ?? 'ap-south-1',
  userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
  clientId: process.env.COGNITO_CLIENT_ID ?? '',
};

