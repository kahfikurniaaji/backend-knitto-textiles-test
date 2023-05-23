class CategoriesResponse {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class ItemsResponse {
  constructor(id, name, categoryName, stock) {
    this.id = id;
    this.name = name;
    this.category = categoryName;
    this.stock = stock;
  }
}

class ItemResponse extends ItemsResponse {
  constructor(id, name, categoryName, stock, createdAt, updatedAt, deletedAt) {
    super(id, name, categoryName, stock);
    this.created_at = createdAt;
    this.updated_at = updatedAt;
    this.deleted_at = deletedAt;
  }
}

class TransactionsResponse {
  constructor(id, itemName, count, status) {
    this.id = id;
    this.item_name = itemName;
    this.count = count;
    this.status = status;
  }
}

class TransactionResponse extends TransactionsResponse {
  constructor(id, itemName, categoryName, count, status, createdAt) {
    super(id, itemName, count, status);
    this.categoryName = categoryName;
    this.created_at = createdAt;
  }
}

export {
  CategoriesResponse,
  ItemResponse,
  ItemsResponse,
  TransactionResponse,
  TransactionsResponse,
};
