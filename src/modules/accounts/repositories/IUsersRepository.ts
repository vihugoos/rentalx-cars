import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUser } from "@modules/accounts/entities/IUser";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    list(): Promise<IUser[]>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
    updateUserAvatar(id: string, avatar_file: string): Promise<IUser>;
    updatedUserPassword(id: string, password: string): Promise<IUser>;
}
