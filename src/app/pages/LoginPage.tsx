import loginImage from "@assets/login.jpg";
import { GuestOnly } from "@features/auth/components/GuestOnly";
import { LoginForm } from "@features/auth/components/LoginForm";
import { BRAND } from "@shared/constants/brand";
import { ROUTES } from "@shared/constants/routes";
import { Link } from "react-router";

export function LoginPage() {
	return (
		<GuestOnly>
			<main className="grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-[3fr_2fr]">
				<section className="flex flex-col items-center justify-center gap-5 px-4">
					<Link to={ROUTES.home}>
						<img src={BRAND.logoSrc} alt={BRAND.logoAlt} className="w-24" />
					</Link>
					<h1 className="mb-3 font-semibold text-2xl">Inicio de sesión</h1>
					<LoginForm />
				</section>
				<img
					src={loginImage}
					alt="Evento de baloncesto femenino"
					className="hidden size-full object-cover brightness-90 lg:block"
				/>
			</main>
		</GuestOnly>
	);
}
