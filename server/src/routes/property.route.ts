import { Router } from "express";
import { PropertyController } from "../controllers";
import { PropertyValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
class Property {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get(
            "/get/:id",
            PropertyValidator.getPropertyById(),
            GlobalMiddleware.CheckValidationResult,
            PropertyController.getPropertyById
        );
        this.router.get(
            "/own-properties",
            GlobalMiddleware.CheckAuth,
            PropertyController.getPropertyByUserId
        );
        this.router.get("/all", PropertyController.getAllProperties);
    }
    postRoutes() {
        this.router.post(
            "/create",
            PropertyValidator.createProperty(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyController.createProperty
        );
        this.router.post(
            "/transfer",
            PropertyValidator.transferProperty(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyController.transferProperty
        );
        this.router.post(
            "/update-price",
            PropertyValidator.updatePriceOfProperty(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyController.updatePriceOfProperty
        );
        this.router.post(
            "/update-sale-status",
            PropertyValidator.updateSaleStatus(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyController.updateSaleStatus
        );
    }
}
export const PropertyRoutes=new Property().router;
