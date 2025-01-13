import {prisma} from "../model";
export class TransactionRepository {


    static async createTransaction(propertyId: string, amount: string,sellerId: string,buyerId: string) {
        return await prisma.transaction.create({
            data: {
                propertyId,
                amount,
                sellerId,
                buyerId
            }
        });
    }

    static async getTransactions() {
        return await prisma.transaction.findMany(
            {
                where:{
                    completed:true
                }
            }
        );
    }

    static async getTransactionByPropertyId(propertyId: string,buyerOrsellerId: string) {
        return await prisma.transaction.findFirst(
            {
                where:{
                    propertyId,
                    OR:[
                        {
                            buyerId:buyerOrsellerId
                        },
                        {
                            sellerId:buyerOrsellerId
                        }
                    ]
                }
            }
        );
    }

    static async getBuyerTransactions(buyerId: string) {
        return await prisma.transaction.findMany(
            {
                where:{
                    buyerId,
                    completed:false
                },
                include:{
                    property:true,
                    seller:true,
                    buyer:true
                }
            }
        );
    }
    
    static async getSellerTransactions(sellerId: string) {
        return await prisma.transaction.findMany(
            {
                where:{
                    sellerId,
                    completed:false
                },
                include:{
                    property:true,
                    seller:true,
                    buyer:true
                }
            }
        );
    }

    static async acceptTransaction(transactionId: string) {
        return await prisma.transaction.update({
            where: {id: transactionId},
            data: {
                completed: true
            }
        });
    }

}
