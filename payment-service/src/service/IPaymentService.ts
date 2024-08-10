import { IOrder } from "../models/order";

export interface IPaymentService<T> {
    newPayment(attrs: {externalId: string, userId: string}): Promise<T>
}