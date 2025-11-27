import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string; // e.g. SCHOOL_STUDENT, COLLEGE_STUDENT, EMPLOYEE

  @Column({ type: 'varchar', length: 255 })
  name: string; // Display name

  @Column({ type: 'text', nullable: true })
  description?: string; // Long description for UI / admin

  @Column({ type: 'varchar', length: 255, nullable: true })
  assessment_title?: string; // Heading on assessment page

  @Column({ type: 'varchar', length: 255, nullable: true })
  report_title?: string; // Heading on generated report/PDF

  @Column({ type: 'boolean', default: false })
  is_demo: boolean; // Default FALSE

  @Column({ type: 'boolean', default: true })
  is_active: boolean; // Default TRUE

  @Column({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
