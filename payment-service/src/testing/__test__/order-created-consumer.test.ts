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
    

    await orderCreatedConsumer.onEvent(mockEvent);

    expect(OrderModel.createOrder).toHaveBeenCalledWith({
      externalId: data._id,
      userId: data.userId,
      price: data.sneaker.price,
      status: data.status
    });
  });
});


