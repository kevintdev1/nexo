import { ConfirmContext } from "@shared/context/confirm.context";
import { useRequiredContext } from "./useRequiredContext";

export function useConfirm() {
	return useRequiredContext(ConfirmContext, "useConfirm");
}
