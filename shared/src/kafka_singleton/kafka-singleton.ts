import { Kafka, KafkaConfig } from "kafkajs";

/* Using singleton pattern to provide one instance of kafka in each service */

export class KafkaSingleton {

    private static kafkaConfig: KafkaConfig
    private static instance: Kafka | null = null; //singleton

    constructor(kafkaConfig: KafkaConfig) {
        KafkaSingleton.kafkaConfig = kafkaConfig;
    }

    /* returns kafka instance */
    public setupKafkaInstance(): Kafka {

        if (!KafkaSingleton.instance) {
            KafkaSingleton.instance = new Kafka(KafkaSingleton.kafkaConfig);
        }

        return KafkaSingleton.instance
    }

}