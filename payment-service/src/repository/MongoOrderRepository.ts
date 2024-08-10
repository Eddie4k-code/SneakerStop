import { IOrder, IOrderDocument, OrderModel } from "../models/order";
import { IOrderRepository } from "./IOrderRepository";

/* A concrete implementation of sneaker repository */
export class MongoOrderRepository implements IOrderRepository<IOrderDocument> {


    async getOrder(id: string): Promise<IOrderDocument | null> {
        const order = await OrderModel.findById(id);

        return order;
    }
    
    
}