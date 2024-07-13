import { GenericConsumer, GenericProducer } from "@sneakerstop/shared";
import { IOrderCreatedEvent } from "@sneakerstop/shared";
import { SneakerModel } from "../../models/sneaker";

/* Producer that is utilized when a new sneaker event occurs */
export class SneakerCreatedConsumer extends GenericConsumer<any> { 

    groupId = 'sneaker-created-from-order-service'

    
    async onEvent(data: any) {

        
  
        let jsonData = JSON.parse(data.value);

        const {_id, title, price} = jsonData.data;

    
        const sneaker = SneakerModel.createSneaker({
            externalId: _id,
            title: title,
            price: price
        }); 

        await sneaker.save();

        console.log("Processed sneaker-created event in order-service", data.value.data);


    }
    
}