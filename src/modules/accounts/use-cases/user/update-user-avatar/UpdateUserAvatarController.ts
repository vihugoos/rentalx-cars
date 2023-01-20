import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.user;
        const avatar_filename = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        await updateUserAvatarUseCase.execute({
            user_id,
            avatar_filename,
        });

        return response.status(204).send();
    }
}
