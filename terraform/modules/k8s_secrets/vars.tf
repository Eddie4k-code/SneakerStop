variable "jwt_secret" {
    sensitive = true
    default = "change_me123"
}

variable "stripe_secret" {
    sensitive = true
}

