import { createContext } from "react";
import type { AuthService } from "./auth.service";

export const AuthServiceContext = createContext<AuthService | null>(null);
