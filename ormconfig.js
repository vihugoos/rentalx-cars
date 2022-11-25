module.exports = {
    type: "postgres",
    host: "localhost",
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrations: [`./${process.env.BASE_FOLDER}/shared/infra/typeorm/migrations/*.ts`],
    entities: [`./${process.env.BASE_FOLDER}/modules/**/entities/*.ts`],
    cli: {
        migrationsDir: `./${process.env.BASE_FOLDER}/shared/infra/typeorm/migrations/`,
    },
};
