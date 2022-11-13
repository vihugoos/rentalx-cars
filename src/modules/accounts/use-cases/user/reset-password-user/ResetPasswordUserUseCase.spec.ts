import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;

describe("Reset Password User Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        resetPasswordUserUseCase = new ResetPasswordUserUseCase(
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            usersRepositoryInMemory
        );
    });

    it("Should be able to reset the user's password", async () => {
        await createUserUseCase.execute({
            name: "Gilbert Rodriguez",
            email: "lun@lotadim.io",
            password: "12345",
            driver_license: "2871776958",
        });

        const { refresh_token } = await authenticateUserUseCase.execute({
            email: "lun@lotadim.io",
            password: "12345",
        });

        await resetPasswordUserUseCase.execute({
            token: refresh_token,
            password: "new_user_password",
        });

        const user = await usersRepositoryInMemory.findByEmail(
            "lun@lotadim.io"
        );

        const passwordMatch = await compare("new_user_password", user.password);

        expect(passwordMatch).toBe(true);
    });

    it("Should not be able to reset the user's password with an invalid token", async () => {
        await expect(
            resetPasswordUserUseCase.execute({
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1bkBsb3RhZGltLmlvIiwiaWF0IjoxNjY4Mjg2NTQ5LCJleHAiOjE2NzA4Nzg1NDksInN1YiI6IjVhMTQ4N2Q1LTQ0OTktNGQ2MS1hMzA3LTBkNzg1ZThmOGY3MCJ9.DVN1ntv3FYmocgES2wCsxL_FEjwGAbLdu32z4_MUao0",
                password: "new_password",
            })
        ).rejects.toEqual(new AppError("Token invalid!"));
    });

    it("Should not be able to reset the user's password with an expired token", async () => {
        const user = await createUserUseCase.execute({
            name: "Erik Patterson",
            email: "levnipvi@dil.sl",
            password: "12345",
            driver_license: "1698171566",
        });

        const refresh_token = sign({}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token,
        });

        console.log("just testing")

        // Insert an already date expired token
        const refresh_token_expires_date = dayjsDateProvider.addDays(-1);

        await usersTokensRepositoryInMemory.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        await expect(
            resetPasswordUserUseCase.execute({
                token: refresh_token,
                password: "new_password",
            })
        ).rejects.toEqual(new AppError("Token is expired!"));
    });
});
