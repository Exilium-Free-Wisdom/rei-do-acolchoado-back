export type User = {
    id: string;
    name: string;
    email: string;
    salt: string;
    hashedPassword: string;
    role: string;
}