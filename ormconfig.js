const BASE_FOLDER = process.env.ENVIRONMENT === "dev" ? "src" : "dist";

module.exports = {
    type: "postgres",
    host: "localhost",
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrations: [`./${BASE_FOLDER}/shared/infra/typeorm/migrations/*.ts`],
    entities: [`./${BASE_FOLDER}/modules/**/entities/*.ts`],
    cli: {
        migrationsDir: `./${BASE_FOLDER}/shared/infra/typeorm/migrations/`,
    },
};
