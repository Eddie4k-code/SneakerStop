terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }

    helm = {
        source = "hashicorp/helm"
    } 
  }
}



provider "kubernetes" {
  config_path = var.k8s_config_path
}

provider "helm" {
  kubernetes {
    config_path = var.k8s_config_path
  }
}