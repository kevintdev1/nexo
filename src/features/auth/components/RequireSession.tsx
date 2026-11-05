import { ROUTES } from "@shared/constants/routes";
import { FullScreenLoader } from "@ui/FullScreenLoader";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import type { Session } from "../domain/session.model";
import { useSession } from "../hooks/useSession";

type RequireSessionProps = {
	children: (session: Session) => ReactNode;
};

export function RequireSession({ children }: RequireSessionProps) {
	const { session, isLoading } = useSession();

	if (isLoading) return <FullScreenLoader />;
	if (!session) return <Navigate to={ROUTES.login} replace />;
	return children(session);
}
