const BASE_FOLDER = process.env.ENVIRONMENT === "dev" ? "src" : "dist";
const FILE_EXTENSION = process.env.ENVIRONMENT === "dev" ? ".ts" : ".js";

module.exports = {
    type: "postgres",
    host: "localhost",
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrations: [`./${BASE_FOLDER}/shared/infra/typeorm/migrations/*${FILE_EXTENSION}`],
    entities: [`./${BASE_FOLDER}/modules/**/entities/*${FILE_EXTENSION}`],
    cli: {
        migrationsDir: `./${BASE_FOLDER}/shared/infra/typeorm/migrations/`,
    },
};
