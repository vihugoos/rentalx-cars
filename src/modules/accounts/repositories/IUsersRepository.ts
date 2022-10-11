import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../entities/IUser";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
}

export { IUsersRepository };
