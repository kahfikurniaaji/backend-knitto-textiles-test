import Transaction from "../model/transaction.js";
import {
  TransactionResponse,
  TransactionsResponse,
} from "../util/map-response.js";
import sequelize from "../config/database.js";
import Item from "../model/item.js";
import { getItemById } from "./item-service.js";
import { convertToLocaleTime } from "../util/convert-time.js";

// Service for adding transaction
const createTransaction = async (transaction) => {
  try {
    const id = await sequelize.transaction(async (t) => {
      if (transaction.status === "IN") {
        await Item.increment("stock", {
          by: transaction.count,
          where: { id: transaction.item_id },
          transaction: t,
        });
      } else {
        await Item.decrement("stock", {
          by: transaction.count,
          where: { id: transaction.item_id },
          transaction: t,
        });
      }

      const item = await getItemById(transaction.item_id);

      const { id } = await Transaction.create(
        {
          item_name: item.name,
          category_name: item.category,
          count: transaction.count,
          status: transaction.status,
        },
        { transaction: t }
      );

      return id;
    });
    return await getTransactionById(id);
  } catch (error) {
    console.error(error);
  }
};

// Service for get all transactions
const getTransactions = async (query = {}) => {
  const { page_limit, page_index } = query;

  const pageIndex = page_index ? parseInt(page_index) : 1;
  const pageLimit = page_limit ? parseInt(page_limit) : 10;

  const offset = (pageIndex - 1) * pageLimit;

  const results = await Transaction.findAll({
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: pageLimit,
  }).then((result) => {
    if (result?.length > 0) {
      result = result.map(
        (value) =>
          new TransactionsResponse(
            value.id,
            value.item_name,
            value.count,
            value.status
          )
      );
    }
    return result || [];
  });

  return results;
};

// Service for get detail transaction
const getTransactionById = async (id) => {
  const result = await Transaction.findByPk(id, {
    plain: true,
  }).then(
    (result) =>
      new TransactionResponse(
        result.id,
        result.item_name,
        result.category_name,
        result.count,
        result.status,
        result.created_at
      )
  );

  convertToLocaleTime(result);

  return result;
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
};
