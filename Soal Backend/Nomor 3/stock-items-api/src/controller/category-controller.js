import categoryService from "../service/category-service.js";

// Controller for add new category
const createCategory = async (req, res, next) => {
  const result = await categoryService
    .createCategory(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for get all categories
const getCategories = async (req, res, next) => {
  const result = await categoryService
    .getCategories(req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get category
const getCategoryById = async (req, res, next) => {
  const result = await categoryService
    .getCategoryById(req.params.categoryId, req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for update category by id
const updateCategoryById = async (req, res, next) => {
  const result = await categoryService
    .updateCategoryById(req.params.categoryId, req.body)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for update category by id
const deleteCategoryById = async (req, res, next) => {
  const result = await categoryService
    .deleteCategoryById(req.params.categoryId)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
