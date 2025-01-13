import { Router } from "express";
import { TransactionController } from "../controllers";
import { TransactionValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
class Transaction {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/getBuyerTransactions",GlobalMiddleware.CheckAuth, TransactionController.getBuyerTransactions);
        this.router.get("/getSellerTransactions",GlobalMiddleware.CheckAuth, TransactionController.getSellerTransactions);
    }
    postRoutes() {
        this.router.post("/create", TransactionValidator.createTransaction(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth, TransactionController.createTransaction);
    }
}
export const TransactionRoutes=new Transaction().router;
