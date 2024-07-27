variable "k8s_config_path" {
    type = string
    description = "The path to our kubernetes cluster config"
    default = "~/.kube/config"
}