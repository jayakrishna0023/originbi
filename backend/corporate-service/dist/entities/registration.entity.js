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
exports.Registration = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Registration = class Registration {
};
exports.Registration = Registration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Registration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], Registration.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Registration.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'country_code',
        type: 'varchar',
        length: 10,
        default: '+91',
    }),
    __metadata("design:type", String)
], Registration.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_number', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Registration.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'registration_source',
        type: 'varchar',
        length: 20,
        default: 'SELF',
    }),
    __metadata("design:type", String)
], Registration.prototype, "registrationSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'corporate_account_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "corporateAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reseller_account_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "resellerAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_level', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "schoolLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'school_stream', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "schoolStream", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_degree_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "departmentDegreeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'program_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "programId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assessment_session_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "assessmentSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by_user_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Registration.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_required', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Registration.prototype, "paymentRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_provider', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "paymentProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_reference', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "paymentReference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_amount', type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "paymentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_created_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Registration.prototype, "paymentCreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Registration.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_status', type: 'varchar', length: 20, default: 'NOT_REQUIRED' }),
    __metadata("design:type", String)
], Registration.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, default: 'INCOMPLETE' }),
    __metadata("design:type", String)
], Registration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', default: () => `'{}'` }),
    __metadata("design:type", Object)
], Registration.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Registration.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Registration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Registration.prototype, "updatedAt", void 0);
exports.Registration = Registration = __decorate([
    (0, typeorm_1.Entity)('registrations')
], Registration);
//# sourceMappingURL=registration.entity.js.map