variable "name" {
  type = string
}

variable "memory" {
  type = number
}

variable "environment" {
  type    = map(string)
  default = {}
}

variable "runtime" {
  type    = string
  default = "nodejs14.x"
}

variable "handler" {
  type    = string
  default = "index.handler"
}

variable "timeout_seconds" {
  type = string
}

variable "inline_policy_documents" {
  type    = set(string)
  default = []
}

variable "managed_policy_arns" {
  type    = set(string)
  default = []
}

variable "network_configuration" {
  type = object({
    vpc_id     = string
    subnet_ids = set(string)
  })

  default = null
}

locals {
  function_name = var.name
  resource_name = "lambda-${local.function_name}"
  vpc_enabled   = var.network_configuration != null
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

output "resource_name" {
  value = local.resource_name
}

output "name" {
  value = var.name
}

output "timeout_seconds" {
  value = var.timeout_seconds
}

