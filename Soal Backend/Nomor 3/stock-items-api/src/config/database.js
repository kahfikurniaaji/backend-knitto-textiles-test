import { Sequelize } from "sequelize";

// Configuring Postgresql database using Sequelize.
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "stock_items",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
