import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUser } from "@modules/accounts/entities/IUser";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

interface IRefreshToken {
    value: string;
    expires_date: Date;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect.");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect.");
        }

        const token = this.generateToken(user);

        const refresh_token = this.generateRefreshToken(user);

        this.saveRefreshToken(
            user.id,
            refresh_token.value,
            refresh_token.expires_date
        );

        const tokenReturn = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token: refresh_token.value,
        };

        return tokenReturn;
    }

    private generateToken(user: IUser): string {
        const token = sign({ email: user.email }, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        return token;
    }

    private generateRefreshToken(user: IUser): IRefreshToken {
        const value = sign({ email: user.email }, auth.secret_refresh_token, {
            subject: user.id,
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
