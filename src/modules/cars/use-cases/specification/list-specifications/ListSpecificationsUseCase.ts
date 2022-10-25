import { inject, injectable } from "tsyringe";

import { ISpecification } from "@modules/cars/entities/ISpecification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute(): Promise<ISpecification[]> {
        return this.specificationsRepository.list();
    }
}

export { ListSpecificationsUseCase };
