import { calculateAge } from "@shared/utils/calculate-age";
import { isPendingId } from "@shared/utils/pending-id";
import { ActionsMenu } from "@ui/ActionsMenu";
import { Avatar } from "@ui/Avatar";
import { Badge } from "@ui/Badge";
import { TableCell, TableRow } from "@ui/Table";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { GENDER_LABELS } from "../constants/student-options";
import { getStudentFullName, type Student } from "../domain/student.model";
import type { StudentActions } from "../hooks/useStudentActions";

type StudentRowProps = {
	student: Student;
	actions: StudentActions;
};

export function StudentRow({ student, actions }: StudentRowProps) {
	const fullName = getStudentFullName(student);
	const age = student.dateOfBirth ? calculateAge(student.dateOfBirth) : null;

	return (
		<TableRow>
			<TableCell>
				<div className="flex items-center gap-3">
					<Avatar src={student.photoUrl} alt={`Foto de ${fullName}`} />
					<div>
						<p className="font-medium">{fullName}</p>
						<p className="text-muted-foreground text-xs">
							{student.nationalId}
						</p>
					</div>
				</div>
			</TableCell>
			<TableCell>{student.enrolmentNumber}</TableCell>
			<TableCell>
				{student.gender ? GENDER_LABELS[student.gender] : "No especificado"}
			</TableCell>
			<TableCell>{age === null ? "—" : `${age} años`}</TableCell>
			<TableCell>
				{student.bloodType && <Badge tone="danger">{student.bloodType}</Badge>}
			</TableCell>
			<TableCell>
				<ActionsMenu
					label={`Acciones para ${fullName}`}
					disabled={isPendingId(student.id)}
					actions={[
						{
							label: "Editar",
							icon: <LuPencil aria-hidden />,
							onSelect: () => actions.edit(student),
						},
						{
							label: "Eliminar",
							icon: <LuTrash2 aria-hidden />,
							tone: "danger",
							onSelect: () => actions.remove(student),
						},
					]}
				/>
			</TableCell>
		</TableRow>
	);
}
