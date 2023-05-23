import { Router } from "express";
import itemController from "../controller/item-controller.js";
import validateItem from "../middleware/validate-item.js";

const itemRouter = Router();
const endpoint = "/items";

itemRouter.post(
  endpoint,
  validateItem.validatePostRequest,
  itemController.createItem
);

itemRouter.get(endpoint, itemController.getItems);

itemRouter.get(
  `${endpoint}/:itemId`,
  validateItem.validateGetAndDeleteRequest,
  itemController.getItemById
);

itemRouter.put(
  `${endpoint}/:itemId`,
  validateItem.validatePutRequest,
  itemController.updateItemById
);

itemRouter.delete(
  `${endpoint}/:itemId`,
  validateItem.validateGetAndDeleteRequest,
  itemController.deleteItemById
);

export default itemRouter;
