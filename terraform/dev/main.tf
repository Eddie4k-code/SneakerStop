
locals {
    /* 
        Grab all YAML Files located in the yml_manifests directory
        returns a set of strings
    */
    all_yamls = fileset("./yml_manifests", "*.yaml")

    /*
        Grab each file based on the names in all_yamls and decode each yaml file into an object
        returns a map of objects
    */
    all_yamls_decoded = {
        for filename in local.all_yamls : filename => yamldecode(file("./yml_manifests/${filename}"))
    }  
}

/* This module is used to apply kubernetes manifests */
module "manifest" {
    for_each = local.all_yamls_decoded
    source = "../modules/manifest"
    manifest = each.value

    depends_on = [
        module.helm
    ]

    providers = {
        kubernetes = kubernetes
    }
}

/* This module is used to apply helm */

module "helm" {
    source = "../modules/helm"

    providers = {
        kubernetes = kubernetes
        helm = helm
    }
}