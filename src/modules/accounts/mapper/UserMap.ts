import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUser } from "@modules/accounts/entities/IUser";

class UserMap {
    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
    }: IUser): IUserResponseDTO {
        return {
            id,
            name,
            email,
            avatar,
            driver_license,
        };
    }
}

export { UserMap };
