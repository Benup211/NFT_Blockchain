import { Router } from "express";
import { UserController } from "../controllers";
import { UserValidator } from "../validators";
import { GlobalMiddleware } from "../middleware";
class UserRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post("/register", UserValidator.createUser(), GlobalMiddleware.CheckValidationResult, UserController.createUser);
        this.router.post("/login", UserValidator.loginUser(), GlobalMiddleware.CheckValidationResult, UserController.loginUser);
        this.router.post("/login-by-blockchain-public-key", UserValidator.getUserByBlockchainPublicKey(), GlobalMiddleware.CheckValidationResult, UserController.loginUserByBlockchainPublicKey);
    }
}
export const UserRoutes = new UserRoute().router;