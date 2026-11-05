import banner from "@assets/banner.jpg";
import { HomeNavBar } from "./HomeNavBar";

export function HomeHero() {
	return (
		<header className="relative h-screen overflow-hidden">
			<img
				src={banner}
				alt="Manos unidas de un equipo de baloncesto"
				className="absolute inset-0 size-full object-cover brightness-90"
			/>
			<div className="relative z-10">
				<HomeNavBar />
			</div>
		</header>
	);
}
