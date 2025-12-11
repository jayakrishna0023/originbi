// auth-service/src/cognito/cognito.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoService {
  async createUserWithPermanentPassword(email: string, password: string) {
    console.log('[CognitoService] createUserWithPermanentPassword called with:', {
      email,
      password,
    });

    // TODO: replace with real AWS Cognito CreateUser + SetPassword
    // For now, just return a mock
    return {
      sub: 'test-sub-123',
      email,
    };
  }
}
