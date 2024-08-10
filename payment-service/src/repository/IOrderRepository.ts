/* abstracts data operations from concrete implementations */

import { IOrder } from "../models/order";

export interface IOrderRepository<T> {
    getOrder(id: string): Promise<T>
}