import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services";
import { PropertyRepository } from "../repository";

export class PropertyController {

    static async createProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { address, price, description, images, otherMetadata } = req.body;
            const userId = req.body.userID;
            const property = await PropertyRepository.createProperty(
                address,
                price,
                description,
                userId,
                images,
                otherMetadata
            );
            ResponseService.CreateSuccessResponse(property,201,res);
        } catch (error) {
            next(error);
        }
    }

    static async getPropertyById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const property = await PropertyRepository.getPropertyById(id);
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

    static async getPropertyByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.userID;
            const property = await PropertyRepository.getPropertyByUserId(userId);
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

    static async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try {
            const property = await PropertyRepository.getAllProperties();
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

    static async transferProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { id,userId } = req.body;
            const property = await PropertyRepository.transferProperty(id, userId);
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

    static async updatePriceOfProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, price } = req.body;
            const property = await PropertyRepository.updatePriceOfProperty(id, price);
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

    static async updateSaleStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, status } = req.body;
            const property = await PropertyRepository.updateSaleStatus(id, status);
            ResponseService.CreateSuccessResponse(property,200,res);
        } catch (error) {
            next(error);
        }
    }

}