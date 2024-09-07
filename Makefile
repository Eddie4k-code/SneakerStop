.PHONY: apply destroy

#Environment to run commands in
ENV := "dev"

# Installs the ingress-nginx controller and applies all Kubernetes infrastructure
apply:
	@cd $(CURDIR)/terraform/$(ENV) && terraform init && terraform plan && terraform apply --auto-approve
	
# Destroys all Kubernetes infrastructure
destroy:
	@cd $(CURDIR)/terraform/$(ENV) && terraform init && terraform destroy --auto-approve\

get_changed_files:
	python3 ./scripts/changed_files.py



