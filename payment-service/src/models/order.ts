import mongoose from 'mongoose';
import {OrderStatus} from '@sneakerstop/shared';


/* Model Creation for Order */


//Properties of a Order
export interface IOrder {
    externalId: string;
    userId: string;
    price: number;
    status: OrderStatus;
}

//Properties of a Order Model
interface IOrderModel extends mongoose.Model<IOrder> {
    createOrder(attrs: IOrder): IOrderDocument
}

//Properties of a Order Document
export interface IOrderDocument extends mongoose.Document {
    userId: string;
    price: number;
    status: OrderStatus;
}

/* Mongo Schema for a Order */
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created 
    }
});


/* Create a Order in Mongo */
orderSchema.statics.createOrder = (attrs: IOrder): IOrderDocument => {
    return new OrderModel({
        _id: attrs.externalId,
        userId: attrs.userId,
        price: attrs.price,
        status: attrs.status
    });
}


const OrderModel = mongoose.model<IOrderDocument, IOrderModel>('User', orderSchema);



export {OrderModel};