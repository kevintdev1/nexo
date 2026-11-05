import { isPendingId } from "@shared/utils/pending-id";
import { ActionsMenu, type MenuAction } from "@ui/ActionsMenu";
import {
	LuClipboardMinus,
	LuClipboardPenLine,
	LuClipboardX,
	LuPencilRuler,
} from "react-icons/lu";
import { type Institution, isAffiliated } from "../domain/institution.model";
import type { InstitutionActions } from "../hooks/useInstitutionActions";

type InstitutionActionsMenuProps = {
	institution: Institution;
	actions: InstitutionActions;
};

export function InstitutionActionsMenu({
	institution,
	actions,
}: InstitutionActionsMenuProps) {
	const editAction: MenuAction = {
		label: "Editar",
		icon: <LuPencilRuler aria-hidden />,
		onSelect: () => actions.edit(institution),
	};

	const statusActions: MenuAction[] = isAffiliated(institution)
		? [
				{
					label: "Desafiliar",
					icon: <LuClipboardMinus aria-hidden />,
					tone: "danger",
					onSelect: () => actions.unaffiliate(institution),
				},
				{
					label: "Sancionar",
					icon: <LuClipboardX aria-hidden />,
					tone: "danger",
					onSelect: () => actions.sanction(institution),
				},
			]
		: [
				{
					label: "Reafiliar",
					icon: <LuClipboardPenLine aria-hidden />,
					onSelect: () => actions.reaffiliate(institution),
				},
			];

	return (
		<ActionsMenu
			label={`Acciones para ${institution.name}`}
			disabled={isPendingId(institution.id)}
			actions={[editAction, ...statusActions]}
		/>
	);
}
