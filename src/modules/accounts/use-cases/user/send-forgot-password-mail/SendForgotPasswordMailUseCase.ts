import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/date-provider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/mail-provider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider,

        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "..",
            "views",
            "emails",
            "forgot-password.hbs"
        );

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.todayAdd24Hours();

        // To save a token in the database
        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date,
        });

        const variables = {
            name: user.name,
            email: user.email,
            link: `${process.env.API_BASE_URL}/password/reset?token=${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Password Recovery",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
