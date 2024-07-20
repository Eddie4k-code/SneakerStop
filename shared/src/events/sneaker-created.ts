import { OrderStatus } from "./status";

export interface ISneakerCreatedEvent {
    data: {
        _id: string,
        title: string,
        status: OrderStatus,
        userId: string,
        size: number,
        price: number,
        version: number
    }
}