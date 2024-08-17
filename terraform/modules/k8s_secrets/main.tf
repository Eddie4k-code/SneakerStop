resource "kubernetes_secret" "jwt-secret" {
  metadata {
    name = "jwt-secret"
    namespace = "default"
  }

  data = {
    JWT_SECRET = base64encode(var.jwt_secret)
  }
}


resource "kubernetes_secret" "stripe-secret" {
  metadata {
    name = "stripe-secret"
    namespace = "default"
  }

  data = {
    STRIPE_SECRET = var.stripe_secret
  }
}