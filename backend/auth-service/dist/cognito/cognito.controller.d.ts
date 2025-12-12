import { CognitoService } from './cognito.service';
declare class CreateCognitoUserDto {
    email: string;
}
export declare class CognitoController {
    private readonly cognitoService;
    constructor(cognitoService: CognitoService);
    createUser(body: CreateCognitoUserDto): Promise<{
        email: string;
        group: string;
        password: string;
    }>;
}
export {};
