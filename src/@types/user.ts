import type { UUID } from "crypto";

export interface User {
    id: UUID;
    name: string;
    email: string;
    password: string;
    salt: string;
    hashedPassword: string;
    role: string;
}