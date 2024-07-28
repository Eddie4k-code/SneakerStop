variable "k8s_config_path" {
    type = string
    description = "The path to our kubernetes cluster config"
    default = "~/.kube/config"
}


variable "grafana_admin_username" {
    type = string
    default = "admin"
    sensitive = true
}

variable "grafana_admin_password" {
    type = string
    default = "admin"
    sensitive = true
}