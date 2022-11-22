interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    driver_license: string;
    admin: boolean;
    avatar: string;
    avatar_url(): string;
    created_at: Date;
}

export { IUser };
