import {Kafka, logLevel, Producer} from 'kafkajs';

export abstract class GenericProducer {

    topic: string;
    protected producer: Producer;

    // config
    protected kafka = new Kafka({
        logLevel: logLevel.DEBUG,
        brokers:["kafka:29092"],
        clientId: 'sneaker-marketplace',
    });

    
    constructor(topic: string) {
        this.topic = topic;

        this.producer = this.kafka.producer({maxInFlightRequests: 1, idempotent: true, retry: {initialRetryTime: 100, retries:5}}); //EOS Semantics 
    }


    async send<T extends Buffer>(event: T): Promise<void> {

        await this.producer.connect();

        await this.producer.send({
            topic: this.topic,
            messages: [{value: event}],
            acks: -1
        });


        console.log(`Sucessfully Produced to ${this.topic}`);
        

        await this.producer.disconnect();

    }

}