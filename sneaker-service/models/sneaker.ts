import mongoose from 'mongoose';


/* Model Creation for Sneaker */


//Properties of a Sneaker
interface ISneaker {
    title: string;
    size: number;
    price: number;
    userId: string;
}

//Properties of a Sneaker Model
interface ISneakerModel extends mongoose.Model<ISneaker> {
    createSneaker(attrs: ISneaker): ISneakerDocument
}

//Properties of a Sneaker Mongo Document
interface ISneakerDocument extends mongoose.Document {
    title: string;
    size: number;
    price: number;
    userId: string;
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
    }
});


/* Create a Sneaker in Mongo */
sneakerSchema.statics.createSneaker = (attrs: ISneaker): ISneakerDocument => {
    return new SneakerModel(attrs);
}







const SneakerModel = mongoose.model<ISneakerDocument, ISneakerModel>('Sneaker', sneakerSchema);



export {SneakerModel};