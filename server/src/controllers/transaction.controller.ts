import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services";
import { TransactionRepository, PropertyRepository } from "../repository";
export class TransactionController {
    static async createTransaction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { propertyId, amount, buyerId } = req.body;
            const userId = req.body.userID;
            const property = await PropertyRepository.getPropertyById(
                propertyId
            );
            if (!property) {
                throw new Error("Property not found");
            }
            if (property.userId === userId) {
                throw new Error("You can't buy your own property");
            }
            const transactionExists =
                await TransactionRepository.getTransactionByPropertyId(
                    propertyId,
                    userId
                );
            if (transactionExists) {
                throw new Error("Transaction already exists");
            }
            const sellerId = property.userId;
            const transaction = await TransactionRepository.createTransaction(
                propertyId,
                amount,
                sellerId,
                buyerId
            );
            ResponseService.CreateSuccessResponse(transaction, 201, res);
        } catch (error) {
            next(error);
        }
    }

    static async getBuyerTransactions(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.body.userID;
            const transactions =
                await TransactionRepository.getBuyerTransactions(userId);
            ResponseService.CreateSuccessResponse(transactions, 200, res);
        } catch (error) {
            next(error);
        }
    }
    static async getSellerTransactions(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.body.userID;
            const transactions =
                await TransactionRepository.getSellerTransactions(userId);
            ResponseService.CreateSuccessResponse(transactions, 200, res);
        } catch (error) {
            next(error);
        }
    }

    static async updateSellerTransaction(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { transactionId, sellerId } = req.body;
            const userId = req.body.userID;
            if (userId !== sellerId) {
                throw new Error(
                    "You are not authorized to update this transaction"
                );
            }
            const foundtransaction =
                await TransactionRepository.findSellerStatus(
                    transactionId,
                    sellerId
                );
            if (!foundtransaction) {
                throw new Error("Transaction not found");
            }
            const updatedTransaction =
                await TransactionRepository.updateSellerStatus(
                    transactionId,
                    sellerId
                );
            ResponseService.CreateSuccessResponse(updatedTransaction, 200, res);
        } catch (error) {
            next(error);
        }
    }

    static async finalTransaction(req: Request,res: Response,next: NextFunction){
        try {
            const {transactionId,propertyId,buyerId} = req.body;
            const userId = req.body.userID;
            const transaction = await TransactionRepository.getTransactionById(transactionId);
            if(!transaction){
                throw new Error('Transaction not found');
            }
            if(transaction.buyerId !== userId){
                throw new Error('You are not authorized to complete this transaction');
            }
            if(transaction.propertyId !== propertyId){
                throw new Error('Invalid property id');
            }
            const property=await PropertyRepository.changePropertyOwner(propertyId,buyerId);
            if(!property){
                throw new Error('Property not found');
            }
            const finalTransaction = await TransactionRepository.acceptTransaction(transactionId);
            if(!finalTransaction){
                throw new Error('Failed to complete transaction');
            }
            ResponseService.CreateSuccessResponse(finalTransaction,200,res);
        } catch (error) {
            next(error)
        }
    }

    static async getTransactionHistory(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.body.userID;
            const transactions = await TransactionRepository.getTransactionsHistory(userId);
            ResponseService.CreateSuccessResponse(transactions,200,res);
        } catch (error) {
            next(error);
        }
    }

}
