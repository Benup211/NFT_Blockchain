import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services";
import { PropertyRepository } from "../repository";
import { getImageFormat,saveImageFromBase64 } from "../services/image.upload.service";
export class PropertyController {

    static async createProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { name,location,features,description,price,type,contractText,tokenID,ipfsHash,image} = req.body;
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `property-${uniqueSuffix}.${getImageFormat(image)}`;
            const userId = req.body.userID;
            let imagePath:any = "";
            await saveImageFromBase64(image, filename)
            .then((filePath) => {
                imagePath = filePath;
            })
            .catch((err) => {
                throw new Error("Error saving image");
            });
            const property = await PropertyRepository.createProperty(
                name,location,features,description,price,type,imagePath,contractText,tokenID,ipfsHash,userId
            );
            ResponseService.CreateSuccessResponse(property,201,res);
        } catch (error) {
            next(error);
        }
    }

    static async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try{
            const properties = await PropertyRepository.getAllProperties();
            ResponseService.CreateSuccessResponse(properties,200,res);
        }catch(err){
            next(err);
        }
    }

    static async getAllPropertiesByUserId(req: Request, res: Response, next: NextFunction) {
        try{
            const userId = req.body.userID;
            const properties = await PropertyRepository.getAllPropertiesByUserId(userId);
            ResponseService.CreateSuccessResponse(properties,200,res);
        }catch(err){
            next(err);
        }
    }

    static async updatePropertyListing(req: Request, res: Response, next: NextFunction) {
        try{
            const { id,listed } = req.body;
            const userId = req.body.userID;
            const checkProperty = await PropertyRepository.getPropertyById(id);
            if(!checkProperty || checkProperty.userId !== userId){
                throw new Error("You are not authorized to update this property");
            }
            const property = await PropertyRepository.updatePropertyListing(id,listed);
            ResponseService.CreateSuccessResponse(property,200,res);
        }catch(err){
            next(err);
        }
    }
}