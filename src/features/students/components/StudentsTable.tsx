import {
	Table,
	TableBody,
	type TableColumn,
	TableHeader,
	TableLoadingRow,
	TableMessageRow,
} from "@ui/Table";
import type { Student } from "../domain/student.model";
import type { StudentActions } from "../hooks/useStudentActions";
import { StudentRow } from "./StudentRow";

const COLUMNS: readonly TableColumn[] = [
	{ key: "student", label: "Estudiante" },
	{ key: "enrolment", label: "Matrícula" },
	{ key: "gender", label: "Género" },
	{ key: "age", label: "Edad" },
	{ key: "bloodType", label: "Tipo de sangre" },
	{ key: "actions", label: "Acciones" },
];

type StudentsTableProps = {
	students: readonly Student[];
	isLoading: boolean;
	emptyMessage: string;
	actions: StudentActions;
};

export function StudentsTable({
	students,
	isLoading,
	emptyMessage,
	actions,
}: StudentsTableProps) {
	return (
		<Table>
			<TableHeader columns={COLUMNS} />
			<TableBody>
				{isLoading && <TableLoadingRow colSpan={COLUMNS.length} />}
				{!isLoading && students.length === 0 && (
					<TableMessageRow colSpan={COLUMNS.length}>
						{emptyMessage}
					</TableMessageRow>
				)}
				{!isLoading &&
					students.map((student) => (
						<StudentRow key={student.id} student={student} actions={actions} />
					))}
			</TableBody>
		</Table>
	);
}
