import Category from "../model/category.js";
import { CategoriesResponse } from "../util/map-response.js";

// Service for adding category
const createCategory = async (category) => {
  const { id } = await Category.create(category).then((result) => result.get());
  return await getCategoryById(id);
};

// Service for get all categories
const getCategories = async (query) => {
  let { showDeleted = undefined } = query;
  showDeleted = showDeleted !== "true";
  const results = await Category.findAll({
    paranoid: showDeleted,
    order: [["created_at", "DESC"]],
  }).then((result) => {
    if (result?.length > 0) {
      result = result.map(
        (value) => new CategoriesResponse(value.id, value.name)
      );
    }
    return result || [];
  });

  return results;
};

// Service for get detail category
const getCategoryById = async (id, query = {}) => {
  let { showDeleted } = query;
  showDeleted = showDeleted !== "true";
  const result = await Category.findByPk(id, { paranoid: showDeleted }).then(
    (result) => result.get()
  );

  convertToLocaleTime(result);

  return result;
};

// Service for update category by id
const updateCategoryById = async (id, category) => {
  await Category.update(category, {
    where: { id },
  });

  return await getCategoryById(id);
};

// Service for delete category by id
const deleteCategoryById = async (id) => {
  await Category.destroy({ where: { id } });

  return await getCategoryById(id, { showDeleted: "true" });
};

export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
