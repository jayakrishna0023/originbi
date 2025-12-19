import { Repository } from 'typeorm';
import { User } from '../entities/student.entity';
export declare class StudentService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    getProfile(): Promise<{
        message: string;
    }>;
    createTestStudent(email: string, fullName: string): Promise<{
        message: string;
        user: User;
    }>;
}
