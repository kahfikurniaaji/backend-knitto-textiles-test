import Category from "../model/category.js";
import Item from "../model/item.js";
import Transaction from "../model/transaction.js";

const generateTable = async () => {
  await Category.sync({ force: false, alter: true });
  await Item.sync({ force: false, alter: true });
  await Transaction.sync({ force: false, alter: true });
};

const createRelations = async () => {
  Category.hasMany(Item, { foreignKey: "category_id" });
  Item.belongsTo(Category, { foreignKey: "category_id" });
};

const migration = async () => {
  await createRelations();
  await generateTable();
};

export default migration;
