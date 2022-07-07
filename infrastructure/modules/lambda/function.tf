resource "aws_cloudwatch_log_group" "main" {
  name = "/aws/lambda/${local.function_name}"
}

module "network" {
  source = "../network"
}

module "kms_key" {
  source = "../kms_key"
  alias  = local.resource_name
}

data "archive_file" "zip_lambda_function" {
  type = "zip"
  source_dir = "${path.module}/functions/javascript/${var.name}/"
  output_path = "${path.module}/functions/${var.name}.zip"
}

resource "aws_lambda_function" "main" {
  depends_on = [
    aws_cloudwatch_log_group.main,
  ]

  function_name = local.function_name
  role          = module.lambda_role.arn
  runtime       = var.runtime
  handler       = var.handler
  filename      = "${path.module}/functions/${var.name}.zip"
  memory_size   = var.memory
  timeout       = var.timeout_seconds
  kms_key_arn   = module.kms_key.arn
  source_code_hash = "${base64sha256(filebase64("${path.module}/functions/${var.name}.zip"))}"

  environment {
    variables = var.environment
  }

  dynamic "vpc_config" {
    for_each = toset(local.vpc_enabled ? ["main"] : [])
    content {
      subnet_ids         = var.network_configuration.subnet_ids
      security_group_ids = [aws_security_group.main[0].id, module.network.sg]
    }
  }
}

resource "aws_lambda_function_url" "main" {
  function_name      = local.function_name
  authorization_type = "NONE"
  depends_on = [
    aws_lambda_function.main
  ]

  cors {
    allow_origins     = ["http://infinidays-frontend.s3-website.eu-west-2.amazonaws.com"]
    allow_methods     = ["GET"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

output "lambda_url" {
  value = aws_lambda_function_url.main.function_url
}
