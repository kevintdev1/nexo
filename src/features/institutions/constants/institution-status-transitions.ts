import type { ConfirmOptions } from "@shared/context/confirm.context";
import type { MutationMessages } from "@shared/hooks/useConfirmedMutation";
import type { InstitutionStatus } from "../domain/institution.model";

type StatusTransition = {
	confirmation: (institutionName: string) => ConfirmOptions;
	messages: MutationMessages;
};

export const INSTITUTION_STATUS_TRANSITIONS: Readonly<
	Record<InstitutionStatus, StatusTransition>
> = {
	unaffiliated: {
		confirmation: (institutionName) => ({
			title: "¿Desafiliar unidad educativa?",
			description: `¿Estás seguro de desafiliar a la unidad ${institutionName}?`,
			confirmLabel: "Sí, desafiliar",
			tone: "danger",
		}),
		messages: {
			loading: "Desafiliando unidad educativa…",
			success: "Unidad educativa desafiliada correctamente.",
			error: "No se pudo desafiliar la unidad educativa.",
		},
	},
	sanctioned: {
		confirmation: (institutionName) => ({
			title: "¿Sancionar unidad educativa?",
			description: `¿Estás seguro de sancionar a la unidad ${institutionName}?`,
			confirmLabel: "Sí, sancionar",
			tone: "danger",
		}),
		messages: {
			loading: "Sancionando unidad educativa…",
			success: "Unidad educativa sancionada correctamente.",
			error: "No se pudo sancionar la unidad educativa.",
		},
	},
	affiliated: {
		confirmation: (institutionName) => ({
			title: "¿Reafiliar unidad educativa?",
			description: `¿Estás seguro de reafiliar a la unidad ${institutionName}?`,
			confirmLabel: "Sí, reafiliar",
		}),
		messages: {
			loading: "Reafiliando unidad educativa…",
			success: "Unidad educativa reafiliada correctamente.",
			error: "No se pudo reafiliar la unidad educativa.",
		},
	},
};
