import { IEvent } from "@sneakerstop/shared";


/* Mock Implementation for producer */

export class Producer {

    private topic: string
    private kafkaInstance: any

    constructor(topic: string,  kafkaInstance: any) {

        this.topic = topic;
        this.kafkaInstance = kafkaInstance;
        
    }

    async send(data: any) {
        console.log("Fake producing message");
    }
}