# Sneaker Marketplace PoC

## Overview

This project is a proof of concept for a sneaker marketplace built on a microservices architecture, utilizing Kafka for event-driven communication between services. Docker and Kubernetes are employed for containerization and orchestration, with Terraform used for provisioning Kubernetes manifests.

## Architecture

The architecture of the system is based on microservices, each serving a specific function within the sneaker marketplace ecosystem. Kafka acts as the central event bus for communication between these services, enabling decoupling and scalability.


## How is concurrency maintained?
Concurrent operations on the databases will occur, this will be 


## What about duplicate events?
### Idempotent
Within the Kafka Producers we have set `idempotent` to `true`. This configuration will help ensure that duplicate messages are not introduced due to events such as unexpected retries. When a producer sends a message, it will be assigned a Producer Id. The Kafka Broker will keep track of the largest PID-Sequence number combination sucessfully written, discarding lower sequence numbers.




## Main Technologies Used
- Kafka
- Docker
- Kubernetes (k8s)
- Terraform
