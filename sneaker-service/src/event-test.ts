import { Topics } from '@sneakerstop/shared';
import {GenericConsumer} from '@sneakerstop/shared/build/consumer/consumer';



interface INewSneakerEvent  {
    data: any 
}



export class NewSneakerConsumer extends GenericConsumer<INewSneakerEvent> {
    topic = Topics.SNEAKER_CREATED

    onEvent(data: any): void {
        console.log("Event Data!", data);
    }

}