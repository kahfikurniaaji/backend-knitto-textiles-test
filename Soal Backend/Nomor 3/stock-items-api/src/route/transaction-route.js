import { Router } from "express";
import transactionController from "../controller/transaction-controller.js";
import validateTransaction from "../middleware/validate-transaction.js";

const transactionRouter = Router();
const endpoint = "/transactions";

transactionRouter.post(
  endpoint,
  validateTransaction.validatePostRequest,
  transactionController.createTransaction
);

transactionRouter.get(endpoint, transactionController.getTransactions);

transactionRouter.get(
  `${endpoint}/:transactionId`,
  validateTransaction.validateGetRequest,
  transactionController.getTransactionById
);

export default transactionRouter;
