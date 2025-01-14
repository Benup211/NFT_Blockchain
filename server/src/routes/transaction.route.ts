import { Router } from "express";
import { TransactionController } from "../controllers";
import { TransactionValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
class Transaction {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }
    getRoutes() {
        this.router.get("/getBuyerTransactions",GlobalMiddleware.CheckAuth, TransactionController.getBuyerTransactions);
        this.router.get("/getSellerTransactions",GlobalMiddleware.CheckAuth, TransactionController.getSellerTransactions);
        this.router.get("/getTransactionsHistory",GlobalMiddleware.CheckAuth, TransactionController.getTransactionHistory);
    }
    postRoutes() {
        this.router.post("/create", TransactionValidator.createTransaction(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth, TransactionController.createTransaction);
    }
    patchRoutes() {
        this.router.patch("/updateSellerStatus", TransactionValidator.updateSellerStatus(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth, TransactionController.updateSellerTransaction);
        this.router.patch("/finalTransaction", TransactionValidator.FinalTransaction(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth, TransactionController.finalTransaction);
    }
}
export const TransactionRoutes=new Transaction().router;
