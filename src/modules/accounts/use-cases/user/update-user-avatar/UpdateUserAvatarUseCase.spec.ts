import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
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
        const newUser: ICreateUserDTO = {
            name: "User test",
            password: "12345",
            email: "user@test.com",
            driver_license: "ABC-123",
        };

        const user = await createUserUseCase.execute(newUser);

        const userWithAvatar = await updateUserAvatarUseCase.execute({
            user_id: user.id,
            avatar_file: "filename",
        });

        expect(userWithAvatar.avatar).toBeTruthy();
    });
});
