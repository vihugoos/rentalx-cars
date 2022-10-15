import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "@modules/cars/use-cases/car/list-available-cars/ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { type_filter, value } = request.query;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        const cars = await listAvailableCarsUseCase.execute({
            type_filter: type_filter as string,
            value: value as string,
        });

        return response.json(cars);
    }
}

export { ListAvailableCarsController };
