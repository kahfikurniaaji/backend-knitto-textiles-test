import { DataTypes } from "sequelize";
import database from "../config/database.js";

// Defining the "items" table
const Item = database.define(
  "items",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  {
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

export default Item;
