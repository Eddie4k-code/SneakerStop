import { GenericConsumer, GenericProducer } from "@sneakerstop/shared";
import { IOrderCreatedEvent } from "@sneakerstop/shared";
import { SneakerModel } from "../../models/sneaker";
import { OrderModel } from "../../models/order";

/* Consumes events realated to a new order being created */
export class OrderCreatedConsumer extends GenericConsumer<IOrderCreatedEvent> { 

    groupId = 'order-created-from-payment-service'

    
    async onEvent(data: any) {

        
        let jsonData = JSON.parse(data.value);

        const {_id, userId, sneaker, status} = jsonData.data;

    
        const order = OrderModel.createOrder({
            externalId: _id,
            userId: userId,
            price: sneaker.price,
            status: status
        }); 

        await order.save();

        console.log("Processed order-created event in payment-service", jsonData.data);


    }
    
}