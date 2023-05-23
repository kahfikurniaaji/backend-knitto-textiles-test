import categoryRouter from "./category-route.js";
import itemRouter from "./item-route.js";
import transactionRouter from "./transaction-route.js";

// Combine all routers
const router = [categoryRouter, itemRouter, transactionRouter];

export default router;
