import Category from "../model/category.js";
import { Op } from "sequelize";
import { body, param } from "express-validator";
import { checkError } from "../util/validator.js";

const validatePostRequest = [
  body("name")
    .exists({ values: "falsy" })
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  checkError(400),
  body("name").custom(async (value) => {
    return await Category.findOne({
      where: { name: { [Op.like]: value } },
    }).then((category) => {
      if (category) {
        return Promise.reject("Category already exist");
      }
    });
  }),
  checkError(409),
];

const validateGetAndDeleteRequest = [
  param("categoryId")
    .isInt({ min: 1 })
    .withMessage("Category id must be a valid number"),
  checkError(400),
  param("categoryId").custom(async (value, { req }) => {
    let { showDeleted = undefined } = req.query;
    showDeleted = showDeleted !== "true";
    return await Category.findByPk(value, { paranoid: showDeleted }).then(
      (category) => {
        if (!category) {
          return Promise.reject("Category is not exist");
        }
      }
    );
  }),
  checkError(404),
];

const validatePutRequest = [
  body("name")
    .exists({ values: "falsy" })
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim(),
  checkError(400),
  param("categoryId").custom(async (value) => {
    return await Category.findByPk(value).then((category) => {
      if (!category) {
        return Promise.reject("Category is not exist");
      }
    });
  }),
  checkError(404),
  body("name").custom(async (value, { req }) => {
    return await Category.findOne({
      where: { name: { [Op.like]: value } },
    }).then((category) => {
      if (category?.name && category?.id != req.params.categoryId) {
        return Promise.reject("Category already exist");
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
