import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { SpecificationsRepositoryInMemory } from "@modules/cars/infra/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create Specification Use Case", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationsRepositoryInMemory
        );
    });

    it("Should be able to create a new specification", async () => {
        const specification = await createSpecificationUseCase.execute({
            name: "Specification Test",
            description: "Specification test description",
        });

        expect(specification).toHaveProperty("id");
    });

    it("Should not be able to create a new specification with an existing name", () => {
        expect(async () => {
            const specification: ICreateSpecificationDTO = {
                name: "Specification F",
                description: "Specification F description",
            };

            await createSpecificationUseCase.execute(specification);
            await createSpecificationUseCase.execute(specification);
        }).rejects.toBeInstanceOf(AppError);
    });
});
