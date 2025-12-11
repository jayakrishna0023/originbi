// auth-service/src/cognito/cognito.module.ts
import { Module } from '@nestjs/common';
import { CognitoController } from './cognito.controller';
import { CognitoService } from './cognito.service';

@Module({
  controllers: [CognitoController],
  providers: [CognitoService],
  exports: [CognitoService],
})
export class CognitoModule {}
