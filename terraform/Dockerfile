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

# Verify the contents of the ENV directory
RUN ls -la ./${ENV}

# Combine the cd command with subsequent commands
RUN cd ./${ENV} && terraform init && terraform validate

# Set the entrypoint to Terraform
ENTRYPOINT [ "terraform", "plan" ]

