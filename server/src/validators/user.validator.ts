import { body } from "express-validator";
export class UserValidator {
    static createUser() {
        return [
            body("name").notEmpty().withMessage("Name is required"),
            body("email")
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid email"),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .isLength({ min: 8 })
                .withMessage("Password must be at least 8 characters long"),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage("Password and confirm password do not match"),
            body("blockchainPublicKey")
                .notEmpty()
                .withMessage("Blockchain public key is required"),
        ];
    }
    static loginUser() {
        return [
            body("email")
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid email"),
            body("password").notEmpty().withMessage("Password is required"),
        ];
    }

    static getUserById() {
        return [body("id").notEmpty().withMessage("Id is required")];
    }

    static getUserByBlockchainPublicKey() {
        return [
            body("blockchainPublicKey")
                .notEmpty()
                .withMessage("Blockchain public key is required"),
        ];
    }

    
}
