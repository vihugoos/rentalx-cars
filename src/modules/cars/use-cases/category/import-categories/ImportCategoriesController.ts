import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesController {
    async handle(request: Request, response: Response) {
        const { file } = request;

        const importCategoriesUseCase = container.resolve(
            ImportCategoriesUseCase
        );

        await importCategoriesUseCase.execute(file);

        // Wait 3s to create categories in the database (for the ImportCategoriesController.spec test)
        setTimeout(() => {
            return response.status(204).send();
        }, 3000);
    }
}
