import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";

import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe("List Users Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
    });

    it("Should be able to list all registered users", async () => {
        await createUserUseCase.execute({
            name: "User test 1",
            password: "12345",
            email: "email@test.com",
            driver_license: "ABC-123",
        });

        await createUserUseCase.execute({
            name: "User test 2",
            password: "99999",
            email: "usertest@test.com",
            driver_license: "FFX-187",
        });

        const listUsers = await listUsersUseCase.execute();

        expect(listUsers.length).toBe(2);
        expect(listUsers[0].name).toEqual("User test 1");
        expect(listUsers[1].name).toEqual("User test 2");
    });
});
