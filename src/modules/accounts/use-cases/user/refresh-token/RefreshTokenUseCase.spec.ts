import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../create-user/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe("Refresh Token Use Case", () => {
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
        refreshTokenUseCase = new RefreshTokenUseCase(
            usersTokensRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to refresh the refresh_token", async () => {
        await createUserUseCase.execute({
            name: "Minerva Carter",
            email: "vofesuve@puew.gu",
            password: "12345",
            driver_license: "2140124560",
        });

        const { refresh_token } = await authenticateUserUseCase.execute({
            email: "vofesuve@puew.gu",
            password: "12345",
        });

        const new_refresh_token = await refreshTokenUseCase.execute(
            refresh_token
        );

        expect(new_refresh_token).toBeTruthy();
    });

    it("Should not be able to refresh a invalid token", async () => {
        await expect(
            refreshTokenUseCase.execute("token_invalid")
        ).rejects.toEqual(new AppError("Invalid token!", 401));
    });

    it("Should not be able to refresh a non-existent token", async () => {
        await expect(
            refreshTokenUseCase.execute(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvZmVzdXZlQHB1ZXcuZ3UiLCJpYXQiOjE2NjgxMTMzMjQsImV4cCI6MTY3MDcwNTMyNCwic3ViIjoiMzlkYzJhZWMtZWNkYy00MTQ5LTllYzUtNzg0NWY5YjU5MGMyIn0.72zxDtQ-kAbLkJ9uegHwpDmRlZkavRgaQhnZgQm59vY"
            )
        ).rejects.toEqual(new AppError("Refresh token does not exists!"));
    });
});
