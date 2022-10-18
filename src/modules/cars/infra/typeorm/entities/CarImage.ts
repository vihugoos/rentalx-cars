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

    constructor() {
        this.id = uuidV4();
    }
}

export { CarImage };
