import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUser } from "@modules/accounts/entities/IUser";

class UserMap {
    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
        avatar_url,
    }: IUser): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            avatar_url,
        });

        return user;
    }
}

export { UserMap };
