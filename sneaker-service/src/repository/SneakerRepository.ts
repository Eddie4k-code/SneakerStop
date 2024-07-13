import { GenericRequestError } from "@sneakerstop/shared";
import { ISneaker, ISneakerDocument, SneakerModel } from "../../models/sneaker";
import { ISneakerRepository } from "./ISneakerRepository";


/* 
    Implementation details for dealing with a mongo database using our interface for sneaker repository 
    We can plugin other databases if we needed to by simply creating a new class that implements the sneaker repository
*/

export class MongoSneakerRepository implements ISneakerRepository<ISneakerDocument> {

    
    async newSneaker(attrs: ISneaker): Promise<ISneakerDocument> {

        const sneakerExists = await SneakerModel.findOne({title: attrs.title});

        if (sneakerExists) {
            throw new GenericRequestError("Sneaker with that title already exists");
        }
        
        const sneaker = SneakerModel.createSneaker({title: attrs.title, price: attrs.price, size: attrs.size, userId: attrs.userId, version: attrs.version});
        

        await sneaker.save(); 

        return sneaker
    } 

    async allSneakers(): Promise<ISneakerDocument[]> {
        const sneakers = await SneakerModel.find({});
        return sneakers;
    }

    async updateSneaker(id: string, updatedFields: Partial<ISneakerDocument>): Promise<ISneakerDocument | null> {
        // Find the sneaker by ID and update it
        const updatedSneaker = await SneakerModel.findByIdAndUpdate(id, updatedFields, { new: true });
    
        return updatedSneaker;
    }

    async viewSneaker(id: string): Promise<ISneakerDocument | null> {

        const foundSneaker = await SneakerModel.findById(id);

        return foundSneaker;

    }


    



}