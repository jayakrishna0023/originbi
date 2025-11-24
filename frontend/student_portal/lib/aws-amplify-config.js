/**
 * AWS Amplify Configuration for the Student Portal
 *
 * NOTE: Replace the placeholder values below with your actual AWS Cognito and Amplify IDs.
 * These settings are necessary for the Auth, API, and Storage categories to function.
 */
import { Amplify } from 'aws-amplify';
import type { ResourcesConfig } from 'aws-amplify';

// --- PLACEHOLDERS: UPDATE WITH YOUR ACTUAL VALUES ---
const USER_POOL_ID = 'us-east-1_XXXXXXX'; 
const USER_POOL_WEB_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxx';
const IDENTITY_POOL_ID = 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
const REGION = 'us-east-1'; // Ensure this matches your Cognito region
// --- END PLACEHOLDERS ---

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: USER_POOL_ID,
      userPoolClientId: USER_POOL_WEB_CLIENT_ID,
      region: REGION,
      // Optional: Identity Pool configuration if you need access to AWS services like S3
      identityPoolId: IDENTITY_POOL_ID, 
      loginWith: {
        oauth: {
          providers: [], // Add OAuth providers (Google, Facebook, etc.) here if used
          responseType: 'code',
          domain: 'your.auth.domain.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['http://localhost:3000/'], // Update your redirect URLs
          redirectSignOut: ['http://localhost:3000/login/'], 
        }
      }
    }
  },
  // If you are using AWS API Gateway or other services, configure them here:
  // API: { ... },
  // Storage: { ... }
};

/**
 * Configures the AWS Amplify library for the frontend.
 * This should be called once, typically in a root layout or provider file.
 */
export function configureAmplify() {
  Amplify.configure(amplifyConfig);
  console.log("AWS Amplify configured successfully.");
}

// Re-export the config structure type for safety
export type AmplifyResourcesConfig = ResourcesConfig;