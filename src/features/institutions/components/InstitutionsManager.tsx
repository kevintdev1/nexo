import { FilterMenu } from "@shared/components/FilterMenu";
import { useDisclosure } from "@shared/hooks/useDisclosure";
import { useListView } from "@shared/hooks/useListView";
import { useSelection } from "@shared/hooks/useSelection";
import { ContentCard } from "@ui/ContentCard";
import { CreateButton } from "@ui/CreateButton";
import { SearchField } from "@ui/forms/SearchField";
import { Toolbar } from "@ui/Toolbar";
import { useMemo } from "react";
import { LuHousePlus } from "react-icons/lu";
import type { Institution } from "../domain/institution.model";
import {
	createInstitutionFilters,
	getInstitutionSearchText,
} from "../filters/institutions.filters";
import { useCityOptions } from "../hooks/useCityOptions";
import { useInstitutionActions } from "../hooks/useInstitutionActions";
import { useInstitutions } from "../hooks/useInstitutions";
import { CreateInstitutionModal } from "./CreateInstitutionModal";
import { InstitutionsTable } from "./InstitutionsTable";
import { UpdateInstitutionModal } from "./UpdateInstitutionModal";

export function InstitutionsManager() {
	const { institutions, isLoading } = useInstitutions();
	const { cityOptions, isLoading: areCitiesLoading } = useCityOptions();
	const filters = useMemo(
		() => createInstitutionFilters(cityOptions),
		[cityOptions],
	);
	const { results, search, filterMenu } = useListView(
		institutions,
		filters,
		getInstitutionSearchText,
	);
	const createDialog = useDisclosure();
	const editing = useSelection<Institution>();
	const actions = useInstitutionActions(editing.select);

	return (
		<>
			<ContentCard
				header={
					<Toolbar>
						<SearchField
							id="institutions-search"
							label="Buscar unidad educativa"
							placeholder="Buscar por nombre o ciudad"
							{...search}
						/>
						<FilterMenu {...filterMenu} />
						<CreateButton
							label="Registrar unidad educativa"
							icon={<LuHousePlus aria-hidden />}
							onClick={createDialog.open}
						/>
					</Toolbar>
				}
			>
				<InstitutionsTable
					institutions={results}
					isLoading={isLoading}
					emptyMessage={
						institutions.length === 0
							? "No hay instituciones educativas registradas."
							: "Ninguna institución coincide con la búsqueda."
					}
					actions={actions}
				/>
			</ContentCard>

			<CreateInstitutionModal
				isOpen={createDialog.isOpen}
				onClose={createDialog.close}
				cityOptions={cityOptions}
			/>

			{editing.selected && !areCitiesLoading && (
				<UpdateInstitutionModal
					key={editing.selected.id}
					institution={editing.selected}
					onClose={editing.clear}
					cityOptions={cityOptions}
				/>
			)}
		</>
	);
}
