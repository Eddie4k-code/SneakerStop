import { GenericConsumer, GenericProducer } from "@sneakerstop/shared";
import { IOrderCreatedEvent } from "@sneakerstop/shared";
import { SneakerModel } from "../../models/sneaker";

/* Producer that is utilized when a new sneaker event occurs */
export class SneakerCreatedConsumer extends GenericConsumer<any> { 

    groupId = 'sneaker-created-from-order-service'

    
    async onEvent(data: any) {

    
        /* const sneaker = SneakerModel.createSneaker({
            externalId: data.data._id,
            title: data.data.title,
            price: data.data.price
        }); 

        await sneaker.save();
*/
        console.log(data);
        console.log("Processed sneaker-created event in order-service");


    }
    
}