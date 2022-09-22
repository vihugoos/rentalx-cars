import express from "express";

import { routers } from "./routes";

const app = express();

app.use(express.json());

app.use(routers);

app.listen(3333, () => {
    console.log("\nHTTP Server is running on http://localhost:3333");
});
