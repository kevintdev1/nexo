import { Button } from "@ui/Button";
import { InputField } from "@ui/forms/InputField";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
	const { register, errors, isSubmitting, onSubmit } = useLoginForm();

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			className="flex w-full max-w-sm flex-col gap-1"
		>
			<InputField
				id="login-email"
				label="Correo electrónico"
				type="email"
				autoComplete="email"
				placeholder="nombre.apellido@gmail.com"
				error={errors.email?.message}
				{...register("email")}
			/>
			<InputField
				id="login-password"
				label="Contraseña"
				type="password"
				autoComplete="current-password"
				error={errors.password?.message}
				{...register("password")}
			/>
			<Button type="submit" isLoading={isSubmitting} className="mt-5">
				Iniciar sesión
			</Button>
		</form>
	);
}
