import {prisma} from "../model";

export class UserRepository {

    static async checkUser(email:string,blockchainPublicKey?:string){
        return await prisma.user.findFirst({
            where: {
                email: email,
                blockchainPublicKey: blockchainPublicKey
            }
        });

    }

    static async createUser(name:string, email:string, password:string,blockchainPublicKey:string){
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                blockchainPublicKey: blockchainPublicKey
            }
        });

    }

    static async getUserByEmail(email:string){
        return await prisma.user.findFirst({
            where: {
                email: email
            }
        });

    }

    static async getUserById(id:string){
        return await prisma.user.findFirst({
            where: {
                uuid: id
            }
        });

    }

    static async getUserByBlockchainPublicKey(blockchainPublicKey:string){
        return await prisma.user.findFirst({
            where: {
                blockchainPublicKey: blockchainPublicKey
            }
        });
    }
}