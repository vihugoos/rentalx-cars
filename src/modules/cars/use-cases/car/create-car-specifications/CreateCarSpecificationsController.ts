import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase";

class CreateCarSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const { list_specifications_ids } = request.body;

        const createCarSpecificationsUseCase = container.resolve(
            CreateCarSpecificationsUseCase
        );

        const carSpecifications = await createCarSpecificationsUseCase.execute({
            car_id,
            list_specifications_ids,
        });

        return response.status(201).json(carSpecifications);
    }
}

export { CreateCarSpecificationsController };
