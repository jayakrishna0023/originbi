// auth-service/src/cognito/cognito.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminAddUserToGroupCommand,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  private userPoolId: string;

  constructor() {
    const region = process.env.COGNITO_REGION; // ex: ap-south-1
    this.userPoolId = process.env.COGNITO_USER_POOL_ID as string;

    if (!this.userPoolId) {
      throw new Error('COGNITO_USER_POOL_ID is not set');
    }
    if (!region) {
      throw new Error('COGNITO_REGION is not set');
    }

    this.cognitoClient = new CognitoIdentityProviderClient({ region });
  }

  /**
   * Creates a Cognito user and sets a permanent password.
   * Also adds user to the given group.
   */
  async createUserWithPermanentPassword(
    email: string,
    password: string,
    groupName = 'STUDENT',
  ) {
    console.log('[CognitoService] createUserWithPermanentPassword called:', {
      email,
      groupName,
    });

    try {
      // --------------------------
      // 1) Create user (or reuse if exists)
      // --------------------------
      let username = email;
      let userSub: string | null = null;

      try {
        const createRes = await this.cognitoClient.send(
          new AdminCreateUserCommand({
            UserPoolId: this.userPoolId,
            Username: email,
            UserAttributes: [
              { Name: 'email', Value: email },
              { Name: 'email_verified', Value: 'true' }, // optional
            ],
            MessageAction: 'SUPPRESS',
          }),
        );

        username = createRes.User?.Username || email;

        userSub =
          createRes.User?.Attributes?.find((a) => a.Name === 'sub')?.Value ||
          null;
      } catch (err: any) {
        if (err?.name === 'UsernameExistsException') {
          console.warn(
            '[CognitoService] User already exists. Will set password and group.',
          );
          username = email;
        } else {
          console.error('[CognitoService] AdminCreateUser error:', {
            name: err?.name,
            message: err?.message,
            $metadata: err?.$metadata,
          });
          throw err;
        }
      }

      // --------------------------
      // 2) Set permanent password
      // --------------------------
      await this.cognitoClient.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: this.userPoolId,
          Username: username,
          Password: password,
          Permanent: true,
        }),
      );

      // --------------------------
      // 3) Add user to group
      // --------------------------
      if (groupName) {
        await this.cognitoClient.send(
          new AdminAddUserToGroupCommand({
            UserPoolId: this.userPoolId,
            Username: username,
            GroupName: groupName,
          }),
        );
      }

      // --------------------------
      // 4) Fetch sub if not available
      // --------------------------
      if (!userSub) {
        try {
          const getUserRes = await this.cognitoClient.send(
            new AdminGetUserCommand({
              UserPoolId: this.userPoolId,
              Username: username,
            }),
          );

          userSub =
            getUserRes.UserAttributes?.find((a) => a.Name === 'sub')?.Value ||
            null;
        } catch (e: any) {
          console.warn('[CognitoService] AdminGetUser failed:', {
            name: e?.name,
            message: e?.message,
            $metadata: e?.$metadata,
          });
        }
      }

      return {
        sub: userSub ?? username,
        email,
        group: groupName,
      };
    } catch (error: any) {
      // ✅ THIS IS THE IMPORTANT DEBUG BLOCK
      console.error('[CognitoService] AWS error details:', {
        name: error?.name,
        message: error?.message,
        $metadata: error?.$metadata,
      });

      // TEMP: return actual AWS error in response so you can fix quickly
      throw new InternalServerErrorException(
        `Cognito error: ${error?.name || 'Unknown'} - ${
          error?.message || 'No message'
        }`,
      );
    }
  }
}
