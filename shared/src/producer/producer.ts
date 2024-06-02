import {Kafka, logLevel, Producer} from 'kafkajs';
import { Topics } from '../events/topics';
import { IEvent } from '../events/event';

export abstract class GenericProducer<T extends IEvent> {

    topic: Topics;
    protected producer: Producer;

    // config
    protected kafka = new Kafka({
        logLevel: logLevel.DEBUG,
        brokers:["kafka:29092"],
        clientId: 'sneaker-marketplace',
    });

    
    constructor(topic: Topics) {
        this.topic = topic;

        this.producer = this.kafka.producer({maxInFlightRequests: 1, idempotent: true, retry: {initialRetryTime: 100, retries:5}}); //EOS Semantics 
    }


    async send(event: T): Promise<void> {

        await this.producer.connect();

        await this.producer.send({
            topic: this.topic,
            messages: [{value: event as any}],
            acks: -1 //all
        });


        console.log(`Sucessfully Produced to ${this.topic}`);
        

        await this.producer.disconnect();

    }

}