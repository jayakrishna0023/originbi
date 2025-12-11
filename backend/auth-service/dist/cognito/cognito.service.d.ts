export declare class CognitoService {
    createUserWithPermanentPassword(email: string, password: string): Promise<{
        sub: string;
        email: string;
    }>;
}
