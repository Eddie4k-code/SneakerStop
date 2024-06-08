import {Kafka, logLevel, Consumer} from 'kafkajs';
import { Topics } from '../events/topics';
import { IEvent } from '../events/event';


export abstract class GenericConsumer<T extends IEvent> {

    topic: Topics
    protected consumer: Consumer;
    protected groupId: string;
    abstract onEvent(data: any): void;


    // config
    protected kafka = new Kafka({
        logLevel: logLevel.DEBUG,
        brokers:["kafka:29092"], //kafka running on our local kubernetes cluster
        clientId: 'sneaker-marketplace',
    });


   
    constructor(topic: Topics, groupId: string) {

        this.topic = topic;
        this.groupId = groupId;
        this.consumer = this.kafka.consumer({
            groupId: this.groupId,
            retry: {retries: 5, initialRetryTime: 100}
        });
    }

    async listen() {
        await this.consumer.connect().catch(err => console.log("Consumer had Error connecting to kafka broker"));
        console.log(`${this.topic} Consumer Connected to kafka broker`);
        await this.consumer.subscribe({topics: [this.topic]});
        await this.consumer.run({
            eachMessage: async ({topic, message}) => {
                console.log(`Consumer: Sucessfully Consumed from ${this.topic}`);
                
                this.onEvent(message);

            }
        });


        process.on('SIGNINT', async () => {
            console.log("SIGINT signal: closing consumer");
            await this.consumer.disconnect();
            process.exit(0);
        });


        process.on('SIGTERM', async () => {
            console.log("SIGTERM", async () => {
                await this.consumer.disconnect();
                process.exit(0);
            });
        });

        
    }


    parseData(msg: T) {
        return JSON.parse(msg.data);
    } 

}