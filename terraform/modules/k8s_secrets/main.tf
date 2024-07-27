resource "kubernetes_secret" "jwt-secret" {
  metadata {
    name = "jwt-secret"
    namespace = "default"
  }

  data = {
    jwt = base64encode(var.jwt_secret)
  }
}