terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

resource "kubernetes_manifest" "test" {
    manifest = yamldecode(file("${path.module}/manifests/test.yaml"))
}