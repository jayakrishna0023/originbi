"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const common_1 = require("@nestjs/common");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const cognito_config_1 = require("./cognito.config");
let CognitoService = class CognitoService {
    constructor() {
        this.client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: cognito_config_1.cognitoConfig.region,
        });
    }
    async createUserWithPermanentPassword(email, password) {
        var _a, _b;
        // 1) create user without sending email
        await this.client.send(new client_cognito_identity_provider_1.AdminCreateUserCommand({
            UserPoolId: cognito_config_1.cognitoConfig.userPoolId,
            Username: email,
            TemporaryPassword: password,
            MessageAction: 'SUPPRESS',
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'email_verified', Value: 'true' },
            ],
        }));
        // 2) set permanent password
        await this.client.send(new client_cognito_identity_provider_1.AdminSetUserPasswordCommand({
            UserPoolId: cognito_config_1.cognitoConfig.userPoolId,
            Username: email,
            Password: password,
            Permanent: true,
        }));
        // 3) get user's sub
        const user = await this.client.send(new client_cognito_identity_provider_1.AdminGetUserCommand({
            UserPoolId: cognito_config_1.cognitoConfig.userPoolId,
            Username: email,
        }));
        const subAttr = (_a = user.UserAttributes) === null || _a === void 0 ? void 0 : _a.find((a) => a.Name === 'sub');
        const sub = (_b = subAttr === null || subAttr === void 0 ? void 0 : subAttr.Value) !== null && _b !== void 0 ? _b : null;
        return { sub };
    }
};
exports.CognitoService = CognitoService;
exports.CognitoService = CognitoService = __decorate([
    (0, common_1.Injectable)()
], CognitoService);
//# sourceMappingURL=cognito.service.js.map