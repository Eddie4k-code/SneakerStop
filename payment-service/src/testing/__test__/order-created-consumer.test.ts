import { GenericConsumer, IOrderCreatedEvent, OrderStatus, Topics } from "@sneakerstop/shared"
import mongoose from "mongoose"
import { mock, Mock } from "ts-jest-mocker";
import { OrderModel } from "../../models/order";
import { OrderCreatedConsumer } from "../../events/consumers/order-created-consumer";
import { kafkaInstance } from "../..";

const setup = async () => {
    const data: IOrderCreatedEvent = {
        data: {
            _id: new mongoose.Types.ObjectId().toHexString(),
            status: OrderStatus.Created,
            userId: "al;sdkffeieffewfweefw",
            sneaker: {
                _id: "fewfwef",
                price: 120
            }
        }
    }


    return data;
}


describe('OrderCreatedConsumer', () => {

    let orderCreatedConsumer: GenericConsumer<IOrderCreatedEvent>

    beforeEach(() => {
        orderCreatedConsumer = new OrderCreatedConsumer(Topics.ORDER_CREATED, 'TEST', kafkaInstance);
    });



  it('should process order-created event', async () => {
    const mockEvent = {
      value: JSON.stringify({
        data: {
          _id: '12345',
          userId: 'user1',
          price: 100,
          status: 'created'
        }
      })
    };

    await orderCreatedConsumer.onEvent(mockEvent);

    expect(OrderModel.createOrder).toHaveBeenCalledWith({
      externalId: '12345',
      userId: 'user1',
      price: 100,
      status: 'created'
    });
  });
});


