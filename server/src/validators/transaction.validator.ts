import { body, param } from "express-validator";
export class TransactionValidator {
    static createTransaction() {
        return [
            body('propertyId').notEmpty().withMessage('Property id is required'),
            body('amount').notEmpty().withMessage('Amount is required'),
            body('buyerId').notEmpty().withMessage('Invalid buyer id')
        ]
    }
}
