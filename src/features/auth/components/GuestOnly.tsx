import { ROUTES } from "@shared/constants/routes";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useSession } from "../hooks/useSession";

type GuestOnlyProps = {
	children: ReactNode;
};

export function GuestOnly({ children }: GuestOnlyProps) {
	const { session } = useSession();

	if (session) return <Navigate to={ROUTES.dashboard} replace />;
	return children;
}
