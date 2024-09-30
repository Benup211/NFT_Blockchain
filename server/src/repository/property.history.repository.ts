import {prisma} from "../model";

export class PropertyHistoryRepository {
    static async createPropertyHistory(
        propertyId: string,
        buyerMetadata: string,
        buyerKey: string,
        sellerMetadata: string,
        sellerKey: string
    ) {
        return await prisma.propertyTransactionHistory.create({
            data: {
                propertyId,
                buyerMetadata,
                buyerKey,
                sellerMetadata,
                sellerKey,
            },
        });
    }

    static async getPropertyHistoryById(propertyId: string) {
        return await prisma.propertyTransactionHistory.findMany({
            where: {
                propertyId,
            },
        });
    }
}
