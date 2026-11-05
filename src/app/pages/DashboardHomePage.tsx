import { ContentCard } from "@ui/ContentCard";

export function DashboardHomePage() {
	return (
		<ContentCard header={<h1 className="font-semibold text-lg">Inicio</h1>}>
			<p className="text-muted-foreground">
				Selecciona una opción del menú para comenzar.
			</p>
		</ContentCard>
	);
}
