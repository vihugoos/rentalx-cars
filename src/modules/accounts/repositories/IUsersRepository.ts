import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUser } from "@modules/accounts/entities/IUser";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
    updateUserAvatar(id: string, avatar_file: string): Promise<void>;
}

export { IUsersRepository };
