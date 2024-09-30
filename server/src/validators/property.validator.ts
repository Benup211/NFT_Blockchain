import {body,param} from 'express-validator';
export class PropertyValidator{
    static createProperty(){
        return [
            body('address').notEmpty().withMessage('Address is required'),
            body('price').notEmpty().withMessage('Price is required'),
            body('description').notEmpty().withMessage('Description is required'),
            body('images').notEmpty().withMessage('Images are required'),
            body('otherMetadata').optional()
        ];
    }
    static getPropertyById(){
        return [
            param('id').notEmpty().withMessage('Id is required')
        ];
    }

    static transferProperty(){
        return [
            body('id').notEmpty().withMessage('Id is required'),
            body('userId').notEmpty().withMessage('User Id is required')
        ];
    }

    static updatePriceOfProperty(){
        return [
            body('id').notEmpty().withMessage('Id is required'),
            body('price').notEmpty().withMessage('Price is required')
        ];
    }

    static updateSaleStatus(){
        return [
            body('id').notEmpty().withMessage('Id is required'),
            body('status').notEmpty().withMessage('Status is required')
        ];
    }
}