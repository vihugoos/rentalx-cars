import { UsersRepositoryInMemory } from "@modules/accounts/infra/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/use-cases/user/create-user/CreateUserUseCase";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;

describe("Update User Avatar Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
            usersRepositoryInMemory
        );
    });

    it("Should be able to update an user avatar", async () => {
        const user = await createUserUseCase.execute({
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        });

        // Create an user avatar
        await updateUserAvatarUseCase.execute({
            user_id: user.id,
            avatar_file: "filename",
        });

        // Update user avatar
        const userWithAvatar = await updateUserAvatarUseCase.execute({
            user_id: user.id,
            avatar_file: "new_filename",
        });

        expect(userWithAvatar.avatar).toEqual("new_filename");
    });
});
