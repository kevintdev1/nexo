import { createContext } from "react";
import type { UsersService } from "./users.service";

export const UsersServiceContext = createContext<UsersService | null>(null);
