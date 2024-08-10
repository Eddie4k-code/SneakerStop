import { IOrder, IOrderDocument } from "../models/order";
import { ISneakerDocument } from "../models/sneaker";
import { ISneakerRepository } from "./ISneakerRepository";

/* A concrete implementation of sneaker repository */
export class MongoSneakerRepository implements ISneakerRepository<ISneakerDocument>{

    async getSneaker(id: string): Promise<ISneakerDocument> {
        throw new Error("Method not implemented.");
    }
        
}