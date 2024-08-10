resource "kubernetes_secret" "jwt-secret" {
  metadata {
    name = "jwt-secret"
    namespace = "default"
  }

  data = {
    JWT_SECRET = base64encode(var.jwt_secret)
  }
}