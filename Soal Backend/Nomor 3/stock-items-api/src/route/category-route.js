import { Router } from "express";
import categoryController from "../controller/category-controller.js";
import validateCategory from "../middleware/validate-category.js";

const categoryRouter = Router();
const endpoint = "/categories";

categoryRouter.post(
  endpoint,
  validateCategory.validatePostRequest,
  categoryController.createCategory
);

categoryRouter.get(endpoint, categoryController.getCategories);

categoryRouter.get(
  `${endpoint}/:categoryId`,
  validateCategory.validateGetAndDeleteRequest,
  categoryController.getCategoryById
);

categoryRouter.put(
  `${endpoint}/:categoryId`,
  validateCategory.validatePutRequest,
  categoryController.updateCategoryById
);

categoryRouter.delete(
  `${endpoint}/:categoryId`,
  validateCategory.validateGetAndDeleteRequest,
  categoryController.deleteCategoryById
);

export default categoryRouter;
