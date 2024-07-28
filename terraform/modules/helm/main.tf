/* This module contains all necessary helm charts */


/* Setup ingress */
resource "helm_release" "ingress-nginx" {
  name       = "ingress-nginx"

  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  create_namespace = true
}

/* 
  Setup Grafana for metric visualization 
  Ideally in a real this .
*/
resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  namespace  = "default"

  set {
    name = "service.type"
    value = "NodePort"
  }

  set {
    name = "adminUser"
    value = var.grafana_admin_username
  }

  set {
    name = "adminPassword"
    value = var.grafana_admin_password
  }

}