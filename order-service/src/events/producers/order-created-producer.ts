import { GenericProducer } from "@sneakerstop/shared";
import { IOrderCreatedEvent } from "@sneakerstop/shared";

/* Producer that is utilized when a new sneaker event occurs */
export class OrderCreatedProducer extends GenericProducer<IOrderCreatedEvent> {}