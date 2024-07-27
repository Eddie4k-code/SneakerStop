# Sneaker Marketplace PoC

P.S (This has been by far my favorite side project so far xD)

## Overview

This project is a proof of concept for a sneaker marketplace built on a microservices architecture, utilizing Kafka for event-driven communication between services. Docker and Kubernetes are employed for containerization and orchestration, with Terraform used for provisioning Kubernetes manifests.


## Architecture

The architecture of the system is based on microservices, each serving a specific function within the sneaker marketplace ecosystem. Kafka acts as the central event bus for communication between these services, enabling decoupling and scalability.

## Swagger API Documentation

This project uses Swagger for API documentation. You can access the Swagger UI for different services to explore and test the API endpoints.

- **Sneaker Service**: [http://localhost/api-docs/sneakers](http://localhost/api-docs/sneakers)


## What About Order of Events/Messages?
Kafka provides the ability to associate keys with messages. When a message in Kafka is sent with a key, all messages sharing the same key will always go to the same parition in a topic. This helps maintain proper ordering of messages. Without a key, messages are distributed in a round-robin fashion across paritions in a topic.

## What About Duplicate Events?
### Idempotent
Within the Kafka Producers we have set `idempotent` to `true`. This configuration will help ensure that duplicate messages are not introduced due to events such as unexpected retries. When a producer sends a message, it will be assigned a Producer Id. The Kafka Broker will keep track of the largest PID-Sequence number combination sucessfully written, discarding lower sequence numbers.




## Main Technologies Used
- Typescript
- Express
- Node.Js
- Kafka
- Docker
- Kubernetes (k8s)
- Terraform
