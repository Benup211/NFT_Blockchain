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

    static async getTransactionById(transactionId: string) {
        return await prisma.transaction.findUnique(
            {
                where:{
                    id:transactionId
                }
            }
        );
    }

    static async getTransactionByPropertyId(propertyId: string,buyerId: string) {
        return await prisma.transaction.findFirst(
            {
                where:{
                    propertyId,
                    buyerId:buyerId,
                    completed:false
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
    
    static async getTransactionsHistory(userId:string){
        return await prisma.transaction.findMany(
            {
                where:{
                    OR:[
                        {
                            buyerId:userId
                        },
                        {
                            sellerId:userId
                        }
                    ],
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

    static async updateSellerStatus(transactionId: string,sellerId: string) {
        return await prisma.transaction.update({
            where: {
                id: transactionId,
                sellerId:sellerId
            },
            data: {
                sellerAccept: true
            }
        });
    }

    static async findSellerStatus(transactionId:string,sellerId:string){
        return await prisma.transaction.findFirst({
            where:{
                id:transactionId,
                sellerId:sellerId
            }
        });
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
