import { Spinner } from "./Spinner";

type FullScreenLoaderProps = {
	message?: string;
};

export function FullScreenLoader({
	message = "Cargando...",
}: FullScreenLoaderProps) {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-primary">
			<Spinner size="lg" label={message} />
			<p className="text-foreground">{message}</p>
		</div>
	);
}
