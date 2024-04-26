terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

resource "kubernetes_manifest" "resource_manifest" {
    manifest = var.manifest
}