import { inject, injectable } from "tsyringe";

import { IUser } from "@modules/accounts/entities/IUser";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/storage-provider/IStorageProvider";

interface IRequest {
    user_id: string;
    avatar_filename: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatar_filename }: IRequest): Promise<IUser> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_filename, "avatar");

        const userWithAvatar = await this.usersRepository.updateUserAvatar(
            user_id,
            avatar_filename
        );

        return userWithAvatar;
    }
}

export { UpdateUserAvatarUseCase };
