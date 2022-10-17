import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAllAvailable(type_filter: string, value: string): Promise<Car[]> {
        let carsAvailable = this.cars.filter((car) => car.available);

        if (type_filter) {
            if (type_filter === "name") {
                carsAvailable = carsAvailable.filter(
                    (car) => car.name === value
                );
            }

            if (type_filter === "brand") {
                carsAvailable = carsAvailable.filter(
                    (car) => car.brand === value
                );
            }

            if (type_filter === "category_id") {
                carsAvailable = carsAvailable.filter(
                    (car) => car.category_id === value
                );
            }
        }

        return carsAvailable;
    }

    async createCarSpecification(car: Car): Promise<Car> {
        this.cars.push(car);

        return car;
    }
}

export { CarsRepositoryInMemory };
