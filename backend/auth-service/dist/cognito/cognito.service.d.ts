export declare class CognitoService {
    private cognitoClient;
    private userPoolId;
    constructor();
    private generateRandomPassword;
    createStudentUser(email: string): Promise<{
        email: string;
        group: string;
        password: string;
    }>;
}
