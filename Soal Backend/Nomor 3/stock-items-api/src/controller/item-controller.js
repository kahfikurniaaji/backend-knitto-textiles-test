import itemService from "../service/item-service.js";

// Controller for add new item
const createItem = async (req, res, next) => {
  const result = await itemService
    .createItem(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for get all items
const getItems = async (req, res, next) => {
  const result = await itemService
    .getItems(req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get item
const getItemById = async (req, res, next) => {
  const result = await itemService
    .getItemById(req.params.itemId, req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for update item by id
const updateItemById = async (req, res, next) => {
  const result = await itemService
    .updateItemById(req.params.itemId, req.body)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for update item by id
const deleteItemById = async (req, res, next) => {
  const result = await itemService
    .deleteItemById(req.params.itemId)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
