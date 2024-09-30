import { Request, Response, NextFunction } from "express";
import { ResponseService,UserService,JwtService } from "../services";
import { UserRepository } from "../repository";

export class UserController {

    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, blockchainPublicKey } = req.body;
            const checkUser = await UserRepository.checkUser(email, blockchainPublicKey);
            if(checkUser){
                ResponseService.CreateErrorResponse("User already exists",400);
            }
            const hashedPassword = await UserService.hashPassword(password);
            const user = await UserRepository.createUser(
                name,
                email,
                hashedPassword,
                blockchainPublicKey
            );
            ResponseService.CreateSuccessResponse(user,201,res);
        } catch (error) {
            next(error);
        }
    }

    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await UserRepository.getUserByEmail(email);
            if(!user){
                ResponseService.CreateErrorResponse("User not found",400);
                return;
            }
            const passwordMatch = await UserService.comparePassword(password, user.password);
            if(!passwordMatch){
                ResponseService.CreateErrorResponse("Incorrect Credentials",400);
            }
            await JwtService.sign(res,{userID:user.uuid},process.env.JWT_SECRET as string, {expiresIn: "7d"});
            ResponseService.CreateSuccessResponse(user,200,res);
        } catch (error) {
            next(error);
        }
    }

}