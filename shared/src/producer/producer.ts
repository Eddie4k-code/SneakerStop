import {Kafka, logLevel, Producer} from 'kafkajs';
import { Topics } from '../events/topics';
import { IEvent } from '../events/event';

export abstract class GenericProducer<T extends IEvent> {

    topic: Topics;
    protected producer: Producer;
    protected kafkaInstance: Kafka;
    protected key: string; /* Key to help ordering of messages for the same sneaker! */

    
    constructor(topic: Topics, kafkaInstance: Kafka, key: string) {
        this.topic = topic;
        this.kafkaInstance = kafkaInstance;
        this.producer = this.kafkaInstance.producer({maxInFlightRequests: 1, idempotent: true, retry: {initialRetryTime: 100, retries:5}}); //EOS Semantics 
        this.key = key
    }


    async send(event: T, headers?: Record<string, string>): Promise<void> {

        await this.producer.connect();

        await this.producer.send({
            topic: this.topic,
            messages: [{key: this.key, value: JSON.stringify(event as any), headers: headers}],
            acks: -1 //all
        });


        console.log(`Producer: Sucessfully Produced to ${this.topic}`);
        

        await this.producer.disconnect();

    }

}