import { body } from 'express-validator';

export class PropertyHistoryValidator{
    static createPropertyHistory(){
        return [
            body('propertyId').notEmpty().withMessage('Property Id is required'),
            body('buyerMetadata').notEmpty().withMessage('Buyer Metadata is required'),
            body('buyerKey').notEmpty().withMessage('Buyer Key is required'),
            body('sellerMetadata').notEmpty().withMessage('Seller Metadata is required'),
            body('sellerKey').notEmpty().withMessage('Seller Key is required')
        ];
    }

    static getPropertyHistoryById(){
        return [
            body('propertyId').notEmpty().withMessage('Property Id is required')
        ];
    }
}