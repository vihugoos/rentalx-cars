import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<object> {
        try {
            verify(token, auth.secret_refresh_token);
        } catch {
            throw new AppError("Invalid token!", 401);
        }

        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        // To save a refresh_token in the database
        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        return { refresh_token };
    }
}

export { RefreshTokenUseCase };
