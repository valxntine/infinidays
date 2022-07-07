variable "prefix" {
  type = string

  validation {
    condition     = can(regex("\\-$", var.prefix))
    error_message = "The random name must end with a hyphen."
  }
}

variable "suffix_length" {
  type    = number
  default = 4
}

variable "max_length" {
  type = number
}

variable "keepers" {
  type    = map(string)
  default = {}
}

variable "uppercase_suffix" {
  type    = bool
  default = true
}

resource "random_string" "main" {
  length  = var.suffix_length
  upper   = var.uppercase_suffix
  lower   = !var.uppercase_suffix
  number  = true
  special = false
  keepers = var.keepers
}

locals {
  suffix = random_string.main.result
  result = "${substr(var.prefix, 0, var.max_length - length(local.suffix))}${local.suffix}"
}

output "result" {
  value = local.result
}
