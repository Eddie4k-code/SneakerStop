import { RequestValidationError } from "@sneakerstop/shared";
import { IOrder, IOrderDocument } from "../models/order";
import { ISneakerDocument } from "../models/sneaker";
import { IPaymentRepository } from "../repository/IPaymentRepository";
import { IPaymentService } from "./IPaymentService";

export class PaymentService implements IPaymentService<IOrderDocument> {

    private readonly _paymentRepository: IPaymentRepository<IOrderDocument>

    /* Dependency injection via constructor */
    constructor(paymentRepository: IPaymentRepository<IOrderDocument>) {
        this._paymentRepository = paymentRepository;
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