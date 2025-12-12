"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const common_1 = require("@nestjs/common");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
let CognitoService = class CognitoService {
    constructor() {
        this.cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
        });
        this.userPoolId = process.env.COGNITO_USER_POOL_ID;
        if (!this.userPoolId) {
            throw new Error('COGNITO_USER_POOL_ID is not set');
        }
    }
    generateRandomPassword(length = 12) {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+';
        const all = upper + lower + numbers + symbols;
        let password = '';
        password += upper[Math.floor(Math.random() * upper.length)];
        password += lower[Math.floor(Math.random() * lower.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        for (let i = password.length; i < length; i++) {
            password += all[Math.floor(Math.random() * all.length)];
        }
        return password;
    }
    async createStudentUser(email) {
        var _a;
        console.log('[CognitoService] createStudentUser called with:', { email });
        const groupName = 'STUDENT';
        const generatedPassword = this.generateRandomPassword();
        try {
            const createUserCommand = new client_cognito_identity_provider_1.AdminCreateUserCommand({
                UserPoolId: this.userPoolId,
                Username: email,
                UserAttributes: [
                    { Name: 'email', Value: email },
                    { Name: 'email_verified', Value: 'true' },
                ],
                MessageAction: 'SUPPRESS',
            });
            const createUserResponse = await this.cognitoClient.send(createUserCommand);
            const username = ((_a = createUserResponse.User) === null || _a === void 0 ? void 0 : _a.Username) || email;
            const setPasswordCommand = new client_cognito_identity_provider_1.AdminSetUserPasswordCommand({
                UserPoolId: this.userPoolId,
                Username: username,
                Password: generatedPassword,
                Permanent: true,
            });
            await this.cognitoClient.send(setPasswordCommand);
            const addToGroupCommand = new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
                UserPoolId: this.userPoolId,
                Username: username,
                GroupName: groupName,
            });
            await this.cognitoClient.send(addToGroupCommand);
            return {
                email,
                group: groupName,
                password: generatedPassword,
            };
        }
        catch (error) {
            console.error('[CognitoService] Error creating student user:', {
                message: error === null || error === void 0 ? void 0 : error.message,
                code: error === null || error === void 0 ? void 0 : error.name,
            });
            throw new common_1.InternalServerErrorException('Error creating Cognito student');
        }
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CognitoService);
//# sourceMappingURL=cognito.service.js.map