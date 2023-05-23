import transactionService from "../service/transaction-service.js";

// Controller for add new transaction
const createTransaction = async (req, res, next) => {
  const result = await transactionService
    .createTransaction(req.body)
    .catch(async (err) => await next(err));
  res.status(201).json(result);
};

// Controller for get all transactions
const getTransactions = async (req, res, next) => {
  const result = await transactionService
    .getTransactions(req.query)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

// Controller for get transaction
const getTransactionById = async (req, res, next) => {
  const result = await transactionService
    .getTransactionById(req.params.transactionId)
    .catch(async (err) => await next(err));
  res.status(200).json(result);
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
};
