import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFile {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response) {
        const { car_id } = request.params;
        const images = request.files as IFile[];

        const uploadCarImagesUseCase = container.resolve(
            UploadCarImagesUseCase
        );

        const list_images_name = images.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({ car_id, list_images_name });

        // Wait 3s to save images in the database (for the UploadCarImagesController.spec test)
        setTimeout(() => {
            return response.status(204).send();
        }, 3000);
    }
}

export { UploadCarImagesController };
