import {prisma} from "../model";

export class PropertyRepository {


    static async createProperty(
        address: string,
        price: number,
        description: string,
        userId: string,
        images: string[],
        otherMetadata?: string
    ) {
        return await prisma.property.create({
            data: {
                address,
                price,
                description,
                otherMetadata,
                userId,
                images,
            },
        });
    }

    static async getPropertyById(id: string) {
        return await prisma.property.findUnique({
            where: {
                uuid: id,
            },
        });
    }

    static async getPropertyByUserId(userId: string) {
        return await prisma.property.findMany({
            where: {
                userId,
            },
        });
    }

    static async getAllProperties() {
        return await prisma.property.findMany({
            where: {
                onSale: true,
            },
        });
    }

    static async transferProperty(id: string, userId:string) {
        return await prisma.property.update({
            where: {
                uuid: id,
            },
            data: {
                userId,
                onSale: false,
            },
        });
    }

    static async updatePriceOfProperty(id: string, price: number) {
        return await prisma.property.update({
            where: {
                uuid: id,
            },
            data: {
                price,
            },
        });
    }

    static async updateSaleStatus(id: string, onSale: boolean) {
        return await prisma.property.update({
            where: {
                uuid: id,
            },
            data: {
                onSale,
            },
        });
    }
}
