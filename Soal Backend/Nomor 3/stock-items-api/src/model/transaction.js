import { DataTypes } from "sequelize";
import database from "../config/database.js";

// Defining the "Transactions" table
const Transaction = database.define(
  "transactions",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { min: 1 },
    },
    status: {
      type: DataTypes.ENUM("IN", "OUT"),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
  }
);

export default Transaction;
