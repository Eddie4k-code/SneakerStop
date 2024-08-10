/* abstracts data operations from concrete implementations */

import { IOrder } from "../models/order";

export interface ISneakerRepository<T> {
    getSneaker(id: string): Promise<T | null>
}