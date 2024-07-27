/* Setup ingress */
resource "helm_release" "ingress-nginx" {
  name       = "ingress-nginx"

  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  create_namespace = true
}