import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
        });

        this.users.push(user);

        return user;
    }

    async list(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async updateUserAvatar(id: string, avatar_file: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        user.avatar = avatar_file;

        this.users.push(user);

        return user;
    }

    async updatedUserPassword(id: string, password: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);

        user.password = password;

        this.users.push(user);

        return user;
    }
}
