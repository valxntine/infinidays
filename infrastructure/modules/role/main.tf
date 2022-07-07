variable "name_prefix" {
  type = string

  validation {
    condition     = can(regex("^role-[a-z][a-z0-9-]+[a-z0-9]\\-$", var.name_prefix))
    error_message = "The prefix must start with role-, consist of a-z0-9-, and must end with a hyphen."
  }

  validation {
    condition     = !can(regex("[-][-]", var.name_prefix))
    error_message = "The name prefix must not contain consecutive hyphens."
  }
}

variable "service" {
  type = string
}

variable "inline_policy_documents" {
  type    = list(string)
  default = []
}

variable "managed_policy_arns" {
  type    = set(string)
  default = []
}

variable "source_account_ids" {
  type    = set(string)
  default = []
}

module "role_name" {
  source     = "../random_name"
  prefix     = var.name_prefix
  max_length = 64
}

data "aws_caller_identity" "current" {}

locals {
  role_name                = module.role_name.result
  task_permission_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/baseline-task-boundary"
}

data "aws_iam_policy_document" "assume_role" {
  version = "2012-10-17"
  statement {
    effect = "Allow"

    principals {
      identifiers = ["${var.service}.amazonaws.com"]
      type        = "Service"
    }

    actions = ["sts:AssumeRole"]

    dynamic "condition" {
      for_each = length(var.source_account_ids) > 0 ? ["1"] : []
      content {
        test     = "StringEquals"
        variable = "aws:SourceAccount"
        values   = var.source_account_ids
      }
    }
  }
}

resource "aws_iam_role" "main" {
  name                 = local.role_name
  permissions_boundary = local.task_permission_boundary
  assume_role_policy   = data.aws_iam_policy_document.assume_role.json

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_iam_role_policy_attachment" "main" {
  for_each   = toset(var.managed_policy_arns)
  policy_arn = each.key
  role       = aws_iam_role.main.id
}

data "aws_iam_policy_document" "inline" {
  count                   = length(var.inline_policy_documents) > 0 ? 1 : 0
  version                 = "2012-10-17"
  source_policy_documents = var.inline_policy_documents
}

module "inline_policy_name" {
  source     = "../random_name"
  max_length = 64
  prefix     = "task-"
}

resource "aws_iam_role_policy" "inline" {
  count  = length(data.aws_iam_policy_document.inline)
  policy = one(data.aws_iam_policy_document.inline[*].json)
  role   = aws_iam_role.main.id
  name   = module.inline_policy_name.result
}

output "arn" {
  value      = aws_iam_role.main.arn
  depends_on = [aws_iam_role_policy.inline]
}

output "name" {
  value      = aws_iam_role.main.name
  depends_on = [aws_iam_role_policy.inline]
}
