import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/use-cases/user/authenticate-user/AuthenticateUserUseCase";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { CreateCarUseCase } from "@modules/cars/use-cases/car/create-car/CreateCarUseCase";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";
import { deleteFile } from "@utils/delete-file";

let usersRepository: UsersRepository;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let categoriesRepository: CategoriesRepository;
let carsRepository: CarsRepository;
let createCarUseCase: CreateCarUseCase;
let carsImagesRepository: CarsImagesRepository;
let connection: Connection;

const ferrari_488_spider_1_path = `${__dirname}/ferrari-488-spider-1-test.jpg`;
const ferrari_488_spider_2_path = `${__dirname}/ferrari-488-spider-2-test.jpg`;

const deleteImagesFromTempDirectory = async (car_id: string) => {
    await carsImagesRepository
        .filterImagesByCarId(car_id)
        .then(async (car_images) => {
            car_images.map(async (car_image) => {
                await deleteFile(`./tmp/cars/${car_image.image_name}`);
            });
        });
};

describe("Upload Car Images Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.dropDatabase();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin_test", 8);

        await connection.query(
            ` INSERT INTO USERS(id, name, email, password, driver_license, "admin", created_at)
                values('${id}', 'admin_test', 'admin@rentx.com', '${password}', 'XXX-XXX', true, 'now()')
            `
        );
    });

    beforeEach(() => {
        usersRepository = new UsersRepository();
        usersTokensRepository = new UsersTokensRepository();
        dayjsDateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepository,
            usersTokensRepository,
            dayjsDateProvider
        );
        categoriesRepository = new CategoriesRepository();
        carsRepository = new CarsRepository();
        createCarUseCase = new CreateCarUseCase(carsRepository);
        carsImagesRepository = new CarsImagesRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to upload many images for the car", async () => {
        const { token } = await authenticateUserUseCase.execute({
            email: "admin@rentx.com",
            password: "admin_test",
        });

        const category = await categoriesRepository.create({
            name: "Category Test",
            description: "Category test description",
        });

        const car = await createCarUseCase.execute({
            name: "Ferrari 488 Spider",
            description: "Luxury sports",
            daily_rate: 900,
            license_plate: "FSW-2984",
            fine_amount: 4000,
            brand: "Ferrari",
            category_id: category.id,
        });

        // Create images to the car
        await request(app)
            .post(`/cars/images/${car.id}`)
            .attach("images", ferrari_488_spider_1_path)
            .attach("images", ferrari_488_spider_2_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        // Upload images for the car (test UploadCarImagesController)
        const response = await request(app)
            .post(`/cars/images/${car.id}`)
            .attach("images", ferrari_488_spider_1_path)
            .attach("images", ferrari_488_spider_2_path)
            .set({
                Authorization: `Bearer ${token}`,
            });

        const car_images = await carsImagesRepository.filterImagesByCarId(
            car.id
        );

        expect(response.status).toBe(204);
        expect(car_images.length).toBe(2);
        expect(car_images[0].image_name).toContain("ferrari-488-spider-1");
        expect(car_images[1].image_name).toContain("ferrari-488-spider-2");

        await deleteImagesFromTempDirectory(car.id);
    });
});
