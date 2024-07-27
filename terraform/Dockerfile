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

# List contents for debugging
RUN ls -la ./${ENV}

# Set the command to run Terraform commands
ENTRYPOINT sh -c "cd ./${ENV} && terraform init && terraform validate"
