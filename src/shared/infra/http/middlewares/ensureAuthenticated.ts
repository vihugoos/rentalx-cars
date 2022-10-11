import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing.", 401);
    }

    // Bearer 4NDk0MSic3VjoNjEfe
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "a978cb41d2b3e6a1a62cb2efbac8140f"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists.", 401);
        }

        request.user = { user_id };
    } catch {
        throw new AppError("Invalid token!", 401);
    }

    return next();
}
