import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IUser } from "@modules/accounts/entities/IUser";

@Entity("users")
class User implements IUser {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        this.id = uuidV4();
    }
}

export { User };
