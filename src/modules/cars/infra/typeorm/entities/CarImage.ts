import { Expose } from "class-transformer";
import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ICarImage } from "@modules/cars/entities/ICarImage";

import { Car } from "./Car";

@Entity("cars_image")
class CarImage implements ICarImage {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "image_url" })
    image_url(): string {
        if (this.image_name) {
            switch (process.env.DISK_STORAGE) {
                case "local":
                    return `${process.env.APP_API_URL}/cars/${this.image_name}`;

                case "s3":
                    return `${process.env.AWS_BUCKET_URL}/cars/${this.image_name}`;

                default:
                    return null;
            }
        } else {
            return null;
        }
    }

    constructor() {
        this.id = uuidV4();
    }
}

export { CarImage };
