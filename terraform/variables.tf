variable "k8s_config_path" {
    type = string
    description = "The path to our kubernetes cluster config"
    default = "~/.kube/config"
}

variable "env" {
    default = "dev"
    description "the current environment"
}

variable "jwt_secret" {
    description = "Secret used for JWT"
    sensitive   = true
}



