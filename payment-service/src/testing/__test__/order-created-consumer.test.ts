import { GenericConsumer, IOrderCreatedEvent, OrderStatus, Topics } from "@sneakerstop/shared"
import mongoose from "mongoose"
import { mock, Mock } from "ts-jest-mocker";
import { OrderModel } from "../../models/order";
import { OrderCreatedConsumer } from "../../events/consumers/order-created-consumer";
import { kafkaInstance } from "../..";



describe('OrderCreatedConsumer', () => {

    let orderCreatedConsumer: GenericConsumer<IOrderCreatedEvent>

    beforeEach(() => {
        orderCreatedConsumer = new OrderCreatedConsumer(Topics.ORDER_CREATED, 'TEST', kafkaInstance);
    });



  it('should process order-created event', async () => {
    const data = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            status: OrderStatus.Created,
            userId: "al;sdkffeieffewfweefw",
            sneaker: {
                _id: "fewfwef",
                price: 120
            }
    }

    const mockEvent = {
        value: JSON.stringify({data})
    }
    

    orderCreatedConsumer.onEvent(mockEvent);

    const order = await OrderModel.findById(data._id);
    
    expect(order!.price).toEqual(data.sneaker.price);




    
  });
});


