import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@shared/constants/routes";
import { getErrorMessage } from "@shared/utils/get-error-message";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AUTH_QUERY_KEYS } from "../constants/auth.query-keys";
import {
	type LoginFormValues,
	type LoginInput,
	loginSchema,
} from "../schemas/auth.schema";
import { useAuthService } from "./useAuthService";

export function useLoginForm() {
	const authService = useAuthService();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const form = useForm<LoginFormValues, unknown, LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = form.handleSubmit(async (credentials) => {
		try {
			const session = await authService.login(credentials);
			queryClient.setQueryData(AUTH_QUERY_KEYS.session, session);
			navigate(ROUTES.dashboard, { replace: true });
		} catch (error) {
			toast.error(getErrorMessage(error, "No se pudo iniciar sesión."));
		}
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		isSubmitting: form.formState.isSubmitting,
		onSubmit,
	};
}
