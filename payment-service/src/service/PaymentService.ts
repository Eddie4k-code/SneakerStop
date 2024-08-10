import { RequestValidationError } from "@sneakerstop/shared";
import { IOrder, IOrderDocument } from "../models/order";
import { ISneakerDocument } from "../models/sneaker";

import { IPaymentService } from "./IPaymentService";
import { IOrderRepository } from "../repository/IOrderRepository";
import { ISneakerRepository } from "../repository/ISneakerRepository";

export class PaymentService implements IPaymentService<IOrderDocument> {

    private readonly _orderRepository: IOrderRepository<IOrderDocument>
    private readonly _sneakerRepository: ISneakerRepository<ISneakerDocument>

    /* Dependency injection via constructor */
    constructor(orderRepository: IOrderRepository<IOrderDocument>, sneakerRepository: ISneakerRepository<ISneakerDocument>) {
        this._orderRepository = orderRepository;
        this._sneakerRepository = sneakerRepository;
    }

    async newPayment(attrs:any): Promise<any> {

        if (attrs.externalId == null || attrs.externalId == "") {
            throw new RequestValidationError("Order ID not fulfilled");
        }


        return JSON.stringify({
            success: true
        })

        

    }
    
}