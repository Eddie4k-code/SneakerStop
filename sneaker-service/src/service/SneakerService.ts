import { NotAuthorizedError, NotFoundError, RequestValidationError, Topics } from "@sneakerstop/shared";
import { ISneaker, ISneakerDocument } from "../../models/sneaker";
import { ISneakerRepository } from "../repository/ISneakerRepository";
import { ISneakerService } from "./ISneakerService";
import { Producer } from "../events/producers/new-sneaker-producer";
import { kafkaInstance } from "..";

export class SneakerService implements ISneakerService<ISneakerDocument> {

    private readonly _sneakerRepository: ISneakerRepository<ISneakerDocument>;

    constructor(sneakerRepository: ISneakerRepository<ISneakerDocument>) {
        this._sneakerRepository = sneakerRepository;
    }


    async newSneaker(attrs: ISneaker): Promise<ISneakerDocument> {

        if (!attrs.title || !attrs.price || !attrs.size)  {
            throw new RequestValidationError("Title, Price and Size must be fulfilled..");
        }

        const sneaker = await this._sneakerRepository.newSneaker({title: attrs.title, price: attrs.price, size: attrs.size, version: attrs.version, userId: attrs.userId});

        // need to create an abstract implementation that can be injected into the service for producer :)
        const producer = new Producer(Topics.SNEAKER_CREATED, kafkaInstance);

        await producer.send({data: {
            _id: sneaker._id as string,
            title: sneaker.title,
            price: sneaker.price,
            size: sneaker.size,
            version: sneaker.version,
            userId: sneaker.userId
        }});

        return sneaker;


    
        
    } 
    
    async allSneakers(): Promise<ISneakerDocument[]> {
        const sneakers = await this._sneakerRepository.allSneakers();

        return sneakers;
    }

    async updateSneaker(id: string, userId: string,  updatedFields: Partial<ISneakerDocument>): Promise<ISneakerDocument | null> {

        //find if sneaker exists
        const foundSneaker = await this._sneakerRepository.viewSneaker(id);

        if (!foundSneaker) {
            throw new NotFoundError();
        }

        if (userId !== foundSneaker.userId.toString()) {
            throw new NotAuthorizedError('User does not own this sneaker.');
        }

        //update the sneaker
        const updatedSneaker = await this._sneakerRepository.updateSneaker(id, updatedFields);
        

        return updatedSneaker;

    
    }

    async viewSneaker(id: string): Promise<ISneakerDocument | null> {

        const foundSneaker = await this._sneakerRepository.viewSneaker(id);
        
        if (!foundSneaker) {
            throw new NotFoundError();
        }

        return foundSneaker;
    }




}