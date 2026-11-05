import { useRequiredContext } from "@shared/hooks/useRequiredContext";
import { StudentsServiceContext } from "../services/students.context";

export function useStudentsService() {
	return useRequiredContext(StudentsServiceContext, "useStudentsService");
}
