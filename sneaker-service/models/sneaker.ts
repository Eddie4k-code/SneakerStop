import mongoose from 'mongoose';


/* Model Creation for Sneaker */


//Properties of a Sneaker
export interface ISneaker {
    title: string;
    size: number;
    price: number;
    userId: string;
    version: number;
}

//Properties of a Sneaker Model
interface ISneakerModel extends mongoose.Model<ISneaker> {
    createSneaker(attrs: ISneaker): ISneakerDocument
}

//Properties of a Sneaker Mongo Document
export interface ISneakerDocument extends mongoose.Document {
    title: string;
    size: number;
    price: number;
    userId: string;
    version: number
}

/* Mongo Schema for a Sneaker */
const sneakerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true,
        default: 1
    }
});


/* Create a Sneaker in Mongo */
sneakerSchema.statics.createSneaker = (attrs: ISneaker): ISneakerDocument => {
    return new SneakerModel(attrs);
}







const SneakerModel = mongoose.model<ISneakerDocument, ISneakerModel>('Sneaker', sneakerSchema);



export {SneakerModel};