.PHONY: apply destroy

#Environment to run commands in
ENV := "dev"

# Installs the ingress-nginx controller and applies all Kubernetes infrastructure
apply:
	@kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=secret123 && \
	cd $(CURDIR)/terraform/$(ENV) && terraform init && terraform plan && terraform apply --auto-approve
	
# Destroys all Kubernetes infrastructure
destroy:
	kubectl delete secret jwt-secret
	@cd $(CURDIR)/terraform/$(ENV) && terraform init && terraform destroy --auto-approve 
	@kubectl delete namespace ingress-nginx



