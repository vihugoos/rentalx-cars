import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/accounts/entities/IUser";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(): Promise<IUser[]> {
        return this.usersRepository.list();
    }
}

export { ListUsersUseCase };
