import Item from "../model/item.js";
import { Op } from "sequelize";
import { body, param } from "express-validator";
import Category from "../model/category.js";
import { checkError } from "../util/validator.js";

const validatePostRequest = [
  body("name")
    .exists({ values: "falsy" })
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  body("category_id")
    .exists({ values: "falsy" })
    .withMessage("Category id is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Category id must be a valid number")
    .trim(),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a valid number"),
  checkError(400),
  body("name").custom(async (value, { req }) => {
    const { category_id: categoryId } = req.body;
    return await Item.findOne({
      include: {
        model: Category,
        where: { id: categoryId },
      },
      where: { name: { [Op.like]: value } },
    }).then((item) => {
      if (item) {
        return Promise.reject("Item already exist");
      }
    });
  }),
  checkError(409),
];

const validateGetAndDeleteRequest = [
  param("itemId")
    .isInt({ min: 1 })
    .withMessage("Item id must be a valid number"),
  checkError(400),
  param("itemId").custom(async (value, { req }) => {
    let { showDeleted = undefined } = req.query;
    showDeleted = showDeleted !== "true";
    return await Item.findByPk(value, { paranoid: showDeleted }).then(
      (item) => {
        if (!item) {
          return Promise.reject("Item is not exist");
        }
      }
    );
  }),
  checkError(404),
];

const validatePutRequest = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  body("category_id")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Category id must be a valid number")
    .trim(),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a valid number"),
  checkError(400),
  param("itemId").custom(async (value) => {
    return await Item.findByPk(value).then((item) => {
      if (!item) {
        return Promise.reject("Item is not exist");
      }
    });
  }),
  checkError(404),
  body("name").custom(async (value, { req }) => {
    return await Item.findOne({
      where: { name: { [Op.like]: value } },
    }).then((item) => {
      if (item?.name && item?.id != req.params.itemId) {
        return Promise.reject("Item already exist");
      }
    });
  }),
  body("name").custom(async (value, { req }) => {
    const { category_id: categoryId } = req.body;
    return await Item.findOne({
      include: {
        model: Category,
        where: { id: categoryId },
      },
      where: { name: { [Op.like]: value } },
    }).then((item) => {
      if (item?.name && item?.id != req.params.itemId) {
        return Promise.reject("Item already exist");
      }
    });
  }),
  checkError(409),
];

export default {
  validatePostRequest,
  validateGetAndDeleteRequest,
  validatePutRequest,
};
