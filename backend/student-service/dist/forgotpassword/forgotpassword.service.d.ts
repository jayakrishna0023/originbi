import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { User } from '../entities/student.entity';
import { UserActionLog } from '../entities/student-action-log.entity';
export declare class ForgotPasswordService {
    private userRepository;
    private actionLogRepository;
    private httpService;
    private configService;
    private authServiceUrl;
    constructor(userRepository: Repository<User>, actionLogRepository: Repository<UserActionLog>, httpService: HttpService, configService: ConfigService);
    initiateStudentReset(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
