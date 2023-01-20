import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const newUser = this.repository.create({
            name,
            password,
            email,
            driver_license,
        });

        const user = await this.repository.save(newUser);

        return user;
    }

    async list(): Promise<User[]> {
        return this.repository.find();
    }

    async findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }

    async findById(id: string): Promise<User> {
        return this.repository.findOne(id);
    }

    async updateUserAvatar(id: string, avatar_file: string): Promise<User> {
        const user = await this.repository.findOne(id);

        user.avatar = avatar_file;

        const userWithAvatar = await this.repository.save(user);

        return userWithAvatar;
    }

    async updatedUserPassword(id: string, password: string): Promise<User> {
        const user = await this.repository.findOne(id);

        user.password = password;

        const userUpdated = await this.repository.save(user);

        return userUpdated;
    }
}
