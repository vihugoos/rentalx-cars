import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";

import { UserProfileUseCase } from "./UserProfileUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userProfileUseCase: UserProfileUseCase;

describe("User Profile Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        userProfileUseCase = new UserProfileUseCase(usersRepositoryInMemory);
    });

    it("Should be able to get user profile", async () => {
        const user = await createUserUseCase.execute({
            name: "User test",
            password: "12345",
            email: "email@test.com",
            driver_license: "ABC-123",
        });

        const userProfile = await userProfileUseCase.execute(user.id);

        expect(userProfile.id).toEqual(user.id);
        expect(userProfile).not.toHaveProperty("password");
        expect(userProfile).toHaveProperty("avatar");
        expect(userProfile).toHaveProperty("avatar_url");
    });
});
