import { IOrder, IOrderDocument } from "../models/order";
import { IOrderRepository } from "./IOrderRepository";

/* A concrete implementation of sneaker repository */
export class MongoSneakerRepository implements IOrderRepository<IOrderDocument> {


    async getOrder(id: string): Promise<IOrderDocument> {
        throw new Error("Method not implemented.");
    }
    
    
}