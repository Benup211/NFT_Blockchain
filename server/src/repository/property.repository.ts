import {prisma} from "../model";
enum PropertyType {
    apartment = "apartment",
    house = "house"
}
export class PropertyRepository {


    static async createProperty(
        name:string,location:string,features:string[],description:string,price:string,type:PropertyType,image:string,contractText:string,tokenID:string,ipfsHash:string,userId:string
    ) {
        return await prisma.property.create({
            data: {
                name,
                location,
                features,
                description,
                price,
                type,
                image,
                contractText,
                tokenID,
                ipfsHash,
                userId,
            },
        });
    }

    static async getAllProperties() {
        return await prisma.property.findMany({
            where: {
                listed: true,
            },
        });
    }

    static async getAllPropertiesByUserId(userId:string) {
        return await prisma.property.findMany({
            where: {
                userId,
            },
        });
    }

    static async getPropertyById(id:string) {
        return await prisma.property.findUnique({
            where: {
                id,
            },
        });
    }

    static async updatePropertyListing(id:string,listed:boolean) {
        return await prisma.property.update({
            where: {
                id,
            },
            data: {
                listed,
            },
        });
    }
}
