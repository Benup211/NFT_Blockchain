import { body, param } from "express-validator";
export class PropertyValidator {
    static createProperty() {
        return [
            body("name").notEmpty().withMessage("Name is required"),
            body("location").notEmpty().withMessage("Location is required"),
            body("features")
                .isArray({ min: 1 })
                .withMessage(
                    "Features must be an array with at least one feature"
                ),
            body("description")
                .notEmpty()
                .withMessage("Description is required"),
            body("price")
                .notEmpty()
                .withMessage("Price is required")
                .isNumeric()
                .withMessage("Price must be a numeric value"),
            body("type")
                .notEmpty()
                .withMessage("Type is required")
                .isIn(["apartment", "house"])
                .withMessage("Type must be either 'apartment' or 'house'"),
            body("image").notEmpty().withMessage("Image is required"),
            body("contractText")
                .notEmpty()
                .withMessage("Contract text is required"),
            body("tokenID").notEmpty().withMessage("Token ID is required"),
            body("ipfsHash").notEmpty().withMessage("IPFS hash is required"),
        ];
    }
    static updatePropertyListing() {
        return [
            body("id").notEmpty().withMessage("Property ID is required"),
            body("listed")
                .notEmpty()
                .withMessage("Listed status is required")
                .isBoolean()
                .withMessage("Listed status must be a boolean value"),
        ];
    }
}
