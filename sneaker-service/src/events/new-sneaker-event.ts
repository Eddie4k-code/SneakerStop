import { IEvent } from "@sneakerstop/shared";

/* Shape of the event which occurs when a new sneaker is created */
export interface INewSneakerEvent extends IEvent  {
    data: {
        _id: string,
        version: number,
        title: string,
        price: number,
        userId: string
    }
}
