import { FilterMenu } from "@shared/components/FilterMenu";
import { useDisclosure } from "@shared/hooks/useDisclosure";
import { useListView } from "@shared/hooks/useListView";
import { useSelection } from "@shared/hooks/useSelection";
import { ContentCard } from "@ui/ContentCard";
import { CreateButton } from "@ui/CreateButton";
import { SearchField } from "@ui/forms/SearchField";
import { Toolbar } from "@ui/Toolbar";
import { LuUserPlus } from "react-icons/lu";
import type { Student } from "../domain/student.model";
import {
	getStudentSearchText,
	STUDENT_FILTERS,
} from "../filters/students.filters";
import { useStudentActions } from "../hooks/useStudentActions";
import { useStudents } from "../hooks/useStudents";
import { CreateStudentModal } from "./CreateStudentModal";
import { StudentsTable } from "./StudentsTable";
import { UpdateStudentModal } from "./UpdateStudentModal";

export function StudentsManager() {
	const { students, isLoading } = useStudents();
	const { results, search, filterMenu } = useListView(
		students,
		STUDENT_FILTERS,
		getStudentSearchText,
	);
	const createDialog = useDisclosure();
	const editing = useSelection<Student>();
	const actions = useStudentActions(editing.select);

	return (
		<>
			<ContentCard
				header={
					<Toolbar>
						<SearchField
							id="students-search"
							label="Buscar estudiante"
							placeholder="Buscar por nombre, cédula o matrícula"
							{...search}
						/>
						<FilterMenu {...filterMenu} />
						<CreateButton
							label="Registrar estudiante"
							icon={<LuUserPlus aria-hidden />}
							onClick={createDialog.open}
						/>
					</Toolbar>
				}
			>
				<StudentsTable
					students={results}
					isLoading={isLoading}
					emptyMessage={
						students.length === 0
							? "No hay estudiantes registrados."
							: "Ningún estudiante coincide con la búsqueda."
					}
					actions={actions}
				/>
			</ContentCard>

			<CreateStudentModal
				isOpen={createDialog.isOpen}
				onClose={createDialog.close}
			/>

			{editing.selected && (
				<UpdateStudentModal
					key={editing.selected.id}
					student={editing.selected}
					onClose={editing.clear}
				/>
			)}
		</>
	);
}
