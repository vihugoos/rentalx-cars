import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IRental } from "@modules/rentals/entities/IRental";

@Entity("rentals")
class Rental implements IRental {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        this.id = uuidV4();
    }
}

export { Rental };
