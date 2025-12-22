import { CorporateAccount } from './corporate-account.entity';
import { User } from './user.entity';
export declare class CorporateCreditLedger {
    id: number;
    corporateAccountId: number;
    corporateAccount: CorporateAccount;
    creditDelta: number;
    ledgerType: string;
    reason?: string;
    createdByUserId?: number;
    createdByUser?: User;
    createdAt: Date;
    perCreditCost?: number;
    totalAmount?: number;
    paymentStatus?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    paidOn?: Date;
}
