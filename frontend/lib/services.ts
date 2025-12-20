import { AuthService } from "@/lib/services/auth.service";
import { examService } from "@/lib/services/exam.service";
import { reportService } from "@/lib/services/report.service";
import { corporateRegistrationService } from "@/lib/services/corporateRegistration.service";
import { programService } from "@/lib/services/program.service";
import { registrationService } from "@/lib/services/registration.service";
import { corporateDashboardService } from "@/lib/services/corporateDashboard.service";
export type { ApiError, PaginatedResponse } from "./types";

export {
  AuthService,
  examService,
  reportService,
  corporateRegistrationService,
  programService,
  registrationService,
  corporateDashboardService
};
