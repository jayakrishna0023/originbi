import { CognitoService } from './cognito.service';
declare class CreateCognitoUserDto {
    email: string;
    password: string;
}
export declare class CognitoController {
    private readonly cognitoService;
    constructor(cognitoService: CognitoService);
    createUser(body: CreateCognitoUserDto): Promise<{
        sub: string;
        email: string;
    }>;
}
export {};
