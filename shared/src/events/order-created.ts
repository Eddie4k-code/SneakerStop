import { IEvent } from "./event";
import { OrderStatus } from "./status";


/* Shape of the event which occurs when a new order is created */

export interface IOrderCreatedEvent  {
    data: {
        _id: string;
        status: OrderStatus;
        userId: string;
        sneaker: {
            _id: string
            price: number;
        }
    }
}