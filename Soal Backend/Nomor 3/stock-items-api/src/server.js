import express from "express";
import migration from "./config/migration.js";
import router from "./route/index.js";

const app = express();

app.use(express.json());

app.use(router);

app.listen(
  process.env.PORT || 3000,
  process.env.HOST || "localhost",
  async () => {
    await migration();
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  }
);
