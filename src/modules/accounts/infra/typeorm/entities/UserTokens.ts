import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { IUserTokens } from "@modules/accounts/entities/IUserTokens";

import { User } from "./User";

@Entity("users_tokens")
export class UserTokens implements IUserTokens {
    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        this.id = uuidV4();
    }
}
