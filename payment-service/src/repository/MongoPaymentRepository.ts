import { IOrder, IOrderDocument } from "../models/order";
import { IPaymentRepository } from "./IPaymentRepository";

export class MongoPaymentRepository implements IPaymentRepository<IOrderDocument>{


    async newPayment(attrs: IOrder): Promise<IOrderDocument> {
        throw new Error("Method not implemented.");
    }
    
    
}