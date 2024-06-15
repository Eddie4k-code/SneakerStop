import mongoose from 'mongoose';


/* Model Creation for Order */


//Properties of a Order
interface IOrder {
    userId: string;
    status: string;
    ticket: SneakerDoc; //ref to a sneaker!

}

//Properties of a Order Model
interface IOrderModel extends mongoose.Model<IOrder> {
    createOrder(attrs: IOrder): IOrderDocument
}

//Properties of a Order Document
interface IOrderDocument extends mongoose.Document {
    userId: string;
    status: string;
    ticket: SneakerDoc; //ref to a sneaker!
}

/* Mongo Schema for a Order */
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    sneaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sneaker'
    }
});


/* Create a Order in Mongo */
orderSchema.statics.createOrder = (attrs: IOrder): IOrderDocument => {
    return new OrderModel(attrs);
}







const OrderModel = mongoose.model<IOrderDocument, IOrderModel>('User', orderSchema);



export {OrderModel};