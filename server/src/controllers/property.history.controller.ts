import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services";
import { PropertyHistoryRepository } from "../repository";

export class PropertyHistoryController {
    static async createPropertyHistory(req: Request, res: Response, next: NextFunction) {
        try {
            const { propertyId, buyerMetadata, buyerKey, sellerMetadata, sellerKey } = req.body;
            const propertyHistory = await PropertyHistoryRepository.createPropertyHistory(
                propertyId,
                buyerMetadata,
                buyerKey,
                sellerMetadata,
                sellerKey
            );
            ResponseService.CreateSuccessResponse(propertyHistory,201,res);
        } catch (error) {
            next(error);
        }
    }

    static async getPropertyHistoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const { propertyId } = req.body;
            const propertyHistory = await PropertyHistoryRepository.getPropertyHistoryById(propertyId);
            ResponseService.CreateSuccessResponse(propertyHistory,200,res);
        } catch (error) {
            next(error);
        }
    }
}