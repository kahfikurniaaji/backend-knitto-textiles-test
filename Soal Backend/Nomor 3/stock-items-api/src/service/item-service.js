import Item from "../model/item.js";
import Category from "../model/category.js";
import { ItemResponse, ItemsResponse } from "../util/map-response.js";
import { convertToLocaleTime } from "../util/convert-time.js";

// Service for adding item
const createItem = async (item) => {
  const { id } = await Item.create(item).then((result) => result.get());
  return await getItemById(id);
};

// Service for get all items
const getItems = async (query) => {
  let { showDeleted = undefined } = query;
  showDeleted = showDeleted !== "true";
  const results = await Item.findAll({
    include: Category,
    order: [["created_at", "DESC"]],
    paranoid: showDeleted,
  }).then((result) => {
    if (result?.length > 0) {
      result = result.map(
        (value) =>
          new ItemsResponse(
            value.id,
            value.name,
            value.category.name,
            value.stock
          )
      );
    }
    return result || [];
  });

  return results;
};

// Service for get detail item
export const getItemById = async (id, query = {}) => {
  let { showDeleted = undefined } = query;
  showDeleted = showDeleted !== "true";
  const result = await Item.findByPk(id, {
    include: Category,
    paranoid: showDeleted,
    plain: true,
    nest: true,
  }).then(
    (result) =>
      new ItemResponse(
        result.id,
        result.name,
        result.category.name,
        result.stock,
        result.created_at,
        result.updated_at,
        result.deleted_at
      )
  );

  convertToLocaleTime(result);

  return result;
};

// Service for update item by id
const updateItemById = async (id, item) => {
  await Item.update(item, {
    where: { id },
  });

  return await getItemById(id);
};

// Service for delete item by id
const deleteItemById = async (id) => {
  await Item.destroy({ where: { id } });

  return await getItemById(id, { showDeleted: "true" });
};

export default {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
