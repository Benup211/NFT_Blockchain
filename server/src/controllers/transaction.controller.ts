import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services";
import { TransactionRepository,PropertyRepository } from "../repository";
export class TransactionController {

    static async createTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const { propertyId,amount,buyerId } = req.body;
            const userId = req.body.userID;
            const property = await PropertyRepository.getPropertyById(propertyId);
            if(!property){
                throw new Error("Property not found");
            }
            if(property.userId === userId){
                throw new Error("You can't buy your own property");
            }
            const transactionExists = await TransactionRepository.getTransactionByPropertyId(propertyId,userId);
            if(transactionExists){
                throw new Error("Transaction already exists");
            }
            const sellerId = property.userId;
            const transaction = await TransactionRepository.createTransaction(
                propertyId,amount,sellerId,buyerId
            );
            ResponseService.CreateSuccessResponse(transaction,201,res);
        } catch (error) {
            next(error);
        }
    }

    static async getBuyerTransactions(req: Request, res: Response, next: NextFunction) {
        try{
            const userId = req.body.userID;
            const transactions = await TransactionRepository.getBuyerTransactions(userId);
            ResponseService.CreateSuccessResponse(transactions,200,res);
        }catch(error){
            next(error);
        }
    }
    static async getSellerTransactions(req: Request, res: Response, next: NextFunction) {
        try{
            const userId = req.body.userID;
            const transactions = await TransactionRepository.getSellerTransactions(userId);
            ResponseService.CreateSuccessResponse(transactions,200,res);
        }catch(error){
            next(error);
        }
    }
}