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

interface ITokensResponse {
    token: string;
    refresh_token: string;
}

interface IRefreshToken {
    value: string;
    expires_date: Date;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokensResponse> {
        this.validateIfTokenIsValid(token);

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

        const newToken = this.generateToken(email, user_id);

        const newRefreshToken = this.generateRefreshToken(email, user_id);

        this.saveRefreshToken(
            user_id,
            newRefreshToken.value,
            newRefreshToken.expires_date
        );

        return {
            token: newToken,
            refresh_token: newRefreshToken.value,
        };
    }

    private validateIfTokenIsValid(token: string) {
        try {
            verify(token, auth.secret_refresh_token);
        } catch {
            throw new AppError("Invalid token!", 401);
        }
    }

    private generateToken(email: string, user_id: string): string {
        const token = sign({ email }, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return token;
    }

    private generateRefreshToken(
        email: string,
        user_id: string
    ): IRefreshToken {
        const value = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        const refresh_token = {
            value,
            expires_date,
        };

        return refresh_token;
    }

    private async saveRefreshToken(
        user_id: string,
        token: string,
        expires_date: Date
    ): Promise<void> {
        await this.usersTokensRepository.create({
            user_id,
            refresh_token: token,
            expires_date,
        });
    }
}
