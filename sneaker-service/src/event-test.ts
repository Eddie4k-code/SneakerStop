import { GenericProducer, IEvent, Topics } from '@sneakerstop/shared';
import {GenericConsumer} from '@sneakerstop/shared/build/consumer/consumer';

//test
interface INewSneakerEvent extends IEvent  {
    data: any 
}


//test
export class NewSneakerConsumer extends GenericConsumer<INewSneakerEvent> {

    onEvent(data: INewSneakerEvent): void {
        console.log("Event Data!", data);
    }

}


//test
export class Producer extends GenericProducer<INewSneakerEvent> {}