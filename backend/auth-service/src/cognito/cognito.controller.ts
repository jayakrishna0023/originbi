// auth-service/src/cognito/cognito.controller.ts
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateCognitoUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Controller('internal/cognito')
export class CognitoController {
  constructor(private readonly cognitoService: CognitoService) {}

  @Post('users')
  async createUser(@Body() body: CreateCognitoUserDto) {
    console.log('[auth-service] /internal/cognito/users body =', body);

    const { email, password } = body;

    // Extra safety (even though class-validator already checks)
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const result =
      await this.cognitoService.createUserWithPermanentPassword(
        email,
        password,
      );

    console.log('[auth-service] Cognito result =', result);
    return result;
  }
}
