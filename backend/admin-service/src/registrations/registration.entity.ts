import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export type RegistrationSource = 'SELF' | 'ADMIN' | 'CORPORATE' | 'RESELLER';
export type RegistrationStatus = 'INCOMPLETE' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus =
  | 'NOT_REQUIRED'
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'REFUNDED';

@Entity('registrations')
export class Registration {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // ---- Relations ----
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // ---- Source & Creator ----
  @Column({
    name: 'registration_source',
    type: 'varchar',
    length: 20,
    default: 'SELF',
  })
  registrationSource: RegistrationSource;

  @Column({
    name: 'created_by_user_id',
    type: 'bigint',
    nullable: true,
  })
  createdByUserId: number | null;

  // ---- Organisation Links ----
  @Column({
    name: 'corporate_account_id',
    type: 'bigint',
    nullable: true,
  })
  corporateAccountId: number | null;

  @Column({
    name: 'reseller_account_id',
    type: 'bigint',
    nullable: true,
  })
  resellerAccountId: number | null;

  // ---- Education Links ----
  @Column({
    name: 'school_level_id',
    type: 'smallint',
    nullable: true, // ✅ you made this column nullable in DB
  })
  schoolLevelId: number | null;

  @Column({
    name: 'school_stream_id',
    type: 'smallint',
    nullable: true,
  })
  schoolStreamId: number | null;

  @Column({
    name: 'department_degree_id',
    type: 'bigint',
    nullable: true,
  })
  departmentDegreeId: number | null;

  @Column({
    name: 'group_id',
    type: 'bigint',
    nullable: true,
  })
  groupId: number | null;

  // ---- Payment ----
  @Column({
    name: 'payment_required',
    type: 'boolean',
    default: false,
  })
  paymentRequired: boolean;

  @Column({
    name: 'payment_provider',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  paymentProvider: string | null;

  @Column({
    name: 'payment_reference',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  paymentReference: string | null;

  @Column({
    name: 'payment_amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  paymentAmount: string | null; // keep as string for numeric

  @Column({
    name: 'payment_status',
    type: 'varchar',
    length: 20,
    default: 'NOT_REQUIRED',
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'payment_created_at',
    type: 'timestamptz',
    nullable: true,
  })
  paymentCreatedAt: Date | null;

  @Column({
    name: 'paid_at',
    type: 'timestamptz',
    nullable: true,
  })
  paidAt: Date | null;

  // ---- Registration Status ----
  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'INCOMPLETE', // ✅ must match table CHECK constraint
  })
  status: RegistrationStatus;

  // ---- Metadata ----
  @Column({
    name: 'metadata',
    type: 'jsonb',
    default: () => `'{}'`,
  })
  metadata: any;

  // ---- Soft Delete ----
  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  // ---- Timestamps ----
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
