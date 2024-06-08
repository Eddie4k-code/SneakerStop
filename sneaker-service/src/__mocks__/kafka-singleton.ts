import { IEvent } from "@sneakerstop/shared";


/* Mock Implementation for producer */
export class Producer {
    constructor(private topic: string, private kafkaInstance: any) {}

    send(data: any): void {
        console.log("Fake producing message");
    }
}