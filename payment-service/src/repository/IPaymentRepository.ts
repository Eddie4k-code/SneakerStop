/* abstracts data operations from concrete implementations */

import { IOrder } from "../models/order";

export interface IPaymentRepository<T> {
    newPayment(attrs: IOrder): Promise<T>
}

