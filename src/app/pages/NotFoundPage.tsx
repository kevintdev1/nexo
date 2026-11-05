import { ROUTES } from "@shared/constants/routes";
import { buttonClasses } from "@ui/Button";
import { Link } from "react-router";

export function NotFoundPage() {
	return (
		<main className="flex h-screen flex-col items-center justify-center gap-4 text-center">
			<h1 className="font-bold text-3xl">Página no encontrada</h1>
			<p className="text-muted-foreground">
				La página que buscas no existe o fue movida.
			</p>
			<Link to={ROUTES.home} className={buttonClasses()}>
				Volver al inicio
			</Link>
		</main>
	);
}
