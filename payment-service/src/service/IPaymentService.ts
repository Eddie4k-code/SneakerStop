import { IOrder } from "../models/order";

export interface IPaymentService<T> {
    newPayment(attrs: T): Promise<T>
}