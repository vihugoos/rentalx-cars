import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const newCar = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        const car = await this.repository.save(newCar);

        return car;
    }

    async findById(id: string): Promise<Car> {
        return this.repository.findOne(id);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }

    async findAllAvailable(type_filter: string, value: string): Promise<Car[]> {
        const carsAvailableQuery = this.repository
            .createQueryBuilder("cars")
            .where("available = :available", { available: true });

        if (type_filter) {
            if (type_filter === "name") {
                carsAvailableQuery.andWhere("cars.name = :name", {
                    name: value,
                });
            }

            if (type_filter === "brand") {
                carsAvailableQuery.andWhere("cars.brand = :brand", {
                    brand: value,
                });
            }

            if (type_filter === "category_id") {
                carsAvailableQuery.andWhere("cars.category_id = :category_id", {
                    category_id: value,
                });
            }
        }

        const listCarsAvailable = await carsAvailableQuery.getMany();

        return listCarsAvailable;
    }

    async createCarSpecifications(car: Car): Promise<Car> {
        return this.repository.save(car);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

    async list(): Promise<Car[]> {
        return this.repository.find();
    }
}
