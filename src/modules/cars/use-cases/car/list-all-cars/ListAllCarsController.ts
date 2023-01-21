import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllCarsUseCase } from "./ListAllCarsUseCase";

export class ListAllCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAllCarsUseCase = container.resolve(ListAllCarsUseCase);

        const allCars = await listAllCarsUseCase.execute();

        return response.json(allCars);
    }
}
