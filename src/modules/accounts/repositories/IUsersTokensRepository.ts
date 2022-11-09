import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokens } from "@modules/accounts/entities/IUserTokens";

interface IUsersTokensRepository {
    create(data: ICreateUserTokenDTO): Promise<IUserTokens>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<IUserTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<IUserTokens>;
}

export { IUsersTokensRepository };
