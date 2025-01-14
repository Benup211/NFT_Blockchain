import { body, param } from "express-validator";
export class TransactionValidator {
    static createTransaction() {
        return [
            body('propertyId').notEmpty().withMessage('Property id is required'),
            body('amount').notEmpty().withMessage('Amount is required'),
            body('buyerId').notEmpty().withMessage('Invalid buyer id')
        ]
    }
    static updateSellerStatus(){
        return[
            body('transactionId').notEmpty().withMessage('Transaction id is required'),
            body('sellerId').notEmpty().withMessage('SellerId is required')
        ]
    }
    static FinalTransaction(){
        return[
            body('transactionId').notEmpty().withMessage('Transaction id is required'),
            body('propertyId').notEmpty().withMessage('Property id is required'),
            body('buyerId').notEmpty().withMessage('Buyer id is required')
        ]
    }
}
