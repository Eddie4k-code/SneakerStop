import { OrderStatus } from '@sneakerstop/shared';
import mongoose from 'mongoose';


/* Model Creation for Sneaker */


//Properties of a Sneaker
interface ISneaker {
    externalId: string;
    title: string;
    price: number;
}

//Properties of a Sneaker Model
interface ISneakerModel extends mongoose.Model<ISneaker> {
    createSneaker(attrs: ISneaker): ISneakerDocument
}

//Properties of a Sneaker Mongo Document
export interface ISneakerDocument extends mongoose.Document {
    title: string;
    price: number;
}

/* Mongo Schema for a Sneaker */
const sneakerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});


/* Create a Sneaker in Mongo */
sneakerSchema.statics.createSneaker = (attrs: ISneaker): ISneakerDocument => {
    return new SneakerModel({
        _id: attrs.externalId,
        title: attrs.title,
        price: attrs.price
    });
}

const SneakerModel = mongoose.model<ISneakerDocument, ISneakerModel>('Sneaker', sneakerSchema);



export {SneakerModel};
