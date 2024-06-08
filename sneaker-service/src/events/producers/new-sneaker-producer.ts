import { GenericProducer } from "@sneakerstop/shared";
import { INewSneakerEvent } from "../new-sneaker-event";

/* Producer that is utilized when a new sneaker event occurs */
export class Producer extends GenericProducer<INewSneakerEvent> {}