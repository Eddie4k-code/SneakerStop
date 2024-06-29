import { IEvent } from "@sneakerstop/shared";


/* Mock Implementation for producer */



export const kafkaInstance = {
    setupKafkaInstance: () => {
        console.log("test");
    }
}

export const producer = {
    send: async (data: any) => {
        console.log("test");
    }
}
