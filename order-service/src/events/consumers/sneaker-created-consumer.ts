import { GenericConsumer, GenericProducer } from "@sneakerstop/shared";
import { IOrderCreatedEvent } from "@sneakerstop/shared";
import { SneakerModel } from "../../models/sneaker";

/* Producer that is utilized when a new sneaker event occurs */
export class SneakerCreatedConsumer extends GenericConsumer<any> { 

    groupId = 'sneaker-created-from-order-service'

    
    async onEvent(data: any) {


  
        let jsonData = JSON.parse(data.value);

    
        const sneaker = SneakerModel.createSneaker({
            externalId: jsonData._id,
            title: jsonData.title,
            price: jsonData.price
        }); 

        await sneaker.save();

        console.log("Processed sneaker-created event in order-service", data.value.data);


    }
    
}