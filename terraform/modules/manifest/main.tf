terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}


#Creates a kubernetes manifest
resource "kubernetes_manifest" "resource_manifest" {
    manifest = var.manifest
}