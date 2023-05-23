import Transaction from "../model/transaction.js";
import { body, param } from "express-validator";
import { checkError } from "../util/validator.js";

const validatePostRequest = [
  body("item_id")
    .exists({ values: "falsy" })
    .withMessage("Item id is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Name must be a valid number")
    .trim(),
  body("count")
    .exists({ values: "falsy" })
    .withMessage("Category id is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Category id must be a valid number")
    .trim(),
  body("status")
    .exists({ values: "falsy" })
    .withMessage("Status is required")
    .bail()
    .isIn(["IN", "OUT"])
    .withMessage("Status must be IN or OUT"),
  checkError(400),
];

const validateGetRequest = [
  param("transactionId")
    .isInt({ min: 1 })
    .withMessage("Transaction id must be a valid number"),
  checkError(400),
  param("transactionId").custom(async (value) => {
    return await Transaction.findByPk(value).then((transaction) => {
      if (!transaction) {
        return Promise.reject("Transaction is not exist");
      }
    });
  }),
  checkError(404),
];

export default {
  validatePostRequest,
  validateGetRequest,
};
