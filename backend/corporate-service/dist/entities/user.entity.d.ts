export declare class User {
    id: number;
    cognitoSub?: string;
    email: string;
    fullName: string;
    emailVerified: boolean;
    role: string;
    avatarUrl?: string;
    isActive: boolean;
    isBlocked: boolean;
    metadata: any;
    firstLoginAt?: Date;
    lastLoginAt?: Date;
    lastLoginIp?: string;
    loginCount: number;
    createdAt: Date;
    updatedAt: Date;
    corporateId: string;
}
