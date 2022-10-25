import { SpecificationsRepositoryInMemory } from "@modules/cars/infra/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "@modules/cars/use-cases/specification/create-specification/CreateSpecificationUseCase";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;
let listSpecificationsUseCase: ListSpecificationsUseCase;

describe("List Specifications Use Case", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationsRepositoryInMemory
        );
        listSpecificationsUseCase = new ListSpecificationsUseCase(
            specificationsRepositoryInMemory
        );
    });

    it("Should be able to list all specifications created", async () => {
        await createSpecificationUseCase.execute({
            name: "Specification 1",
            description: "Specification 1 description",
        });

        await createSpecificationUseCase.execute({
            name: "Specification 2",
            description: "Specification 2 description",
        });

        const specifications = await listSpecificationsUseCase.execute();

        expect(specifications.length).toBe(2);
        expect(specifications[0].name).toEqual("Specification 1");
        expect(specifications[1].name).toEqual("Specification 2");
    });
});
