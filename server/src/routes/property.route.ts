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
        this.router.get("/all", PropertyController.getAllProperties);
        this.router.get("/all-by-user", GlobalMiddleware.CheckAuth,PropertyController.getAllPropertiesByUserId);
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
            "/update-listing",
            PropertyValidator.updatePropertyListing(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAuth,
            PropertyController.updatePropertyListing
        );
    }
}
export const PropertyRoutes=new Property().router;
