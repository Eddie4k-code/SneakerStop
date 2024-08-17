import { NotAuthorizedError, NotFoundError, OrderStatus, RequestValidationError } from "@sneakerstop/shared";
import { IOrder, IOrderDocument } from "../models/order";
import { ISneakerDocument } from "../models/sneaker";

import { IPaymentService } from "./IPaymentService";
import { IOrderRepository } from "../repository/IOrderRepository";
import { ISneakerRepository } from "../repository/ISneakerRepository";
import { IPaymentProvider } from "../payment/IPaymentProvider";

export class PaymentService implements IPaymentService<any> {

    private readonly _orderRepository: IOrderRepository<IOrderDocument>
    private readonly _sneakerRepository: ISneakerRepository<ISneakerDocument>
    private readonly _paymentProvider: IPaymentProvider

    /* Dependency injection via constructor */
    constructor(orderRepository: IOrderRepository<IOrderDocument>, sneakerRepository: ISneakerRepository<ISneakerDocument>, paymentProvider: IPaymentProvider) {
        this._orderRepository = orderRepository;
        this._sneakerRepository = sneakerRepository;
        this._paymentProvider = paymentProvider;
        
    }

    //TODO change attrs from any and promise from any...
    async newPayment(attrs:any): Promise<any> {

        if (attrs.externalId == null || attrs.externalId == "") {
            throw new RequestValidationError("Order ID not fulfilled");
        }


        const order = await this._orderRepository.getOrder(attrs.externalId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== attrs.userId) {
            throw new NotAuthorizedError("User Not Authorized.");
        }

        if (order.status == OrderStatus.Cancelled) {
            new RequestValidationError("Order has been cancelled.")
        }

        this._paymentProvider.createCharge(order.price)





        return JSON.stringify({
            success: true
        })

        

    }
    
}