import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'full_name', nullable: true })
    fullName: string;

    @Column({ default: 'STUDENT' })
    role: string;
}
