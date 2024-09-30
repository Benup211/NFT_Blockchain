import { Router } from "express";
import { PropertyHistoryController } from "../controllers";
import { PropertyHistoryValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
class PropertyHistory {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {}
    postRoutes() {
        this.router.post(
            "/create",
            PropertyHistoryValidator.createPropertyHistory(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyHistoryController.createPropertyHistory
        );
        this.router.post(
            "/get",
            PropertyHistoryValidator.getPropertyHistoryById(),
            GlobalMiddleware.CheckValidationResult,
            PropertyHistoryController.getPropertyHistoryById
        );
    }
}
export const PropertyHistoryRoutes=new PropertyHistory().router;
