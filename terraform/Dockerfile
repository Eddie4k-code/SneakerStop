# Use an official Terraform image from HashiCorp
FROM hashicorp/terraform:latest

#set env arg
ARG ENV=dev


# Set the working directory in the container
WORKDIR /app

RUN mkdir modules

COPY ./modules ./modules

# Copy the local Terraform configuration files into the container
COPY ./${ENV} ./${ENV}

RUN ["terraform", "init"]

RUN ["terraform", "validate"]

# Set the entrypoint to Terraform
ENTRYPOINT [ "terraform", "plan" ]

