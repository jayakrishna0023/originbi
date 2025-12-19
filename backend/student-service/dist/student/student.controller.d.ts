import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getProfile(): Promise<{
        message: string;
    }>;
    seedStudent(body: {
        email: string;
        fullName: string;
    }): Promise<{
        message: string;
        user: import("../entities/student.entity").User;
    }>;
}
