import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IUser } from "@modules/accounts/entities/IUser";

@Entity("users")
export class User implements IUser {
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
    admin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url" })
    avatar_url(): string {
        if (this.avatar) {
            switch (process.env.DISK_STORAGE) {
                case "local":
                    return `${process.env.API_BASE_URL}/avatar/${this.avatar}`;

                case "s3":
                    return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;

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
