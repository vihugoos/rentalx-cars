import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarImagesUseCase } from "./ListCarImagesUseCase";

export class ListCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;

        const listCarImagesUseCase = container.resolve(ListCarImagesUseCase);

        const carImages = await listCarImagesUseCase.execute(car_id);

        return response.json(carImages);
    }
}
