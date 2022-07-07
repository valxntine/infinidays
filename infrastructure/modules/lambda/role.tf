module "lambda_role" {
  source      = "../role"
  name_prefix = "role-${lower(local.resource_name)}-"
  service     = "lambda"
  managed_policy_arns = setunion(
    var.managed_policy_arns,
  )

  inline_policy_documents = [
    data.aws_iam_policy_document.role.json,
  ]
}

data "aws_iam_policy_document" "role" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["${aws_cloudwatch_log_group.main.arn}:*"]
  }

  dynamic "statement" {
    for_each = toset(local.vpc_enabled ? ["main"] : [])
    content {
      effect = "Allow"
      actions = [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
      ]
      resources = ["*"]
    }
  }

  dynamic "statement" {
    for_each = toset(local.vpc_enabled ? ["main"] : [])
    content {
      effect = "Deny"
      actions = [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionConfiguration"
      ]
      resources = ["*"]
      condition {
        test     = "ForAnyValue:StringNotEquals"
        variable = "lambda:SubnetIds"
        values   = var.network_configuration.subnet_ids
      }
    }
  }
}

resource "aws_iam_role_policy" "role_inline" {
  count  = length(var.inline_policy_documents) > 0 ? 1 : 0
  policy = one(data.aws_iam_policy_document.role_inline[*].json)
  role   = module.lambda_role.name
}

data "aws_iam_policy_document" "role_inline" {
  count                   = length(var.inline_policy_documents) > 0 ? 1 : 0
  source_policy_documents = var.inline_policy_documents
}
