import type { User } from "../@types/user";

export interface UserRepository {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    checkEmailExists(email: string): Promise<boolean>;
    getByEmail(email: string): Promise<User>;
}