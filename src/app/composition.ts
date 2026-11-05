import { HttpAuthRepository } from "@features/auth/repositories/http-auth.repository";
import { AuthService } from "@features/auth/services/auth.service";
import { HttpInstitutionsRepository } from "@features/institutions/repositories/http-institutions.repository";
import { InstitutionsService } from "@features/institutions/services/institutions.service";
import { HttpStudentsRepository } from "@features/students/repositories/http-students.repository";
import { StudentsService } from "@features/students/services/students.service";
import { HttpUsersRepository } from "@features/users/repositories/http-users.repository";
import { UsersService } from "@features/users/services/users.service";

export const services = {
	auth: new AuthService(new HttpAuthRepository()),
	institutions: new InstitutionsService(new HttpInstitutionsRepository()),
	students: new StudentsService(new HttpStudentsRepository()),
	users: new UsersService(new HttpUsersRepository()),
} as const;
