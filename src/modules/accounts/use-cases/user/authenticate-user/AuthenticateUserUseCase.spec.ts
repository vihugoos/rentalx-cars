import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "000123",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an non-existing user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "12345",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect."));
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "User test error",
            password: "12345",
            email: "user@test.com",
            driver_license: "99999",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect."));
    });
});
