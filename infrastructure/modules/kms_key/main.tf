variable "alias" {
  type = string
}

variable "service_principals" {
  type    = set(string)
  default = []
}

resource "aws_kms_key" "main" {
  enable_key_rotation = true

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(
      [
        {
          Effect = "Allow"
          Principal = {
            AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
          }
          Action   = "kms:*"
          Resource = "*"
        }
      ],
      length(var.service_principals) > 0 ? [
        {
          Effect = "Allow"
          Principal = {
            Service = var.service_principals
          }
          Action   = ["kms:GenerateDataKey*", "kms:Decrypt"]
          Resource = "*"
        }
      ] : [],
    )
  })
}

resource "aws_kms_alias" "main" {
  target_key_id = aws_kms_key.main.id
  name          = "alias/${var.alias}"
}

output "id" {
  value      = aws_kms_key.main.id
  depends_on = [aws_kms_alias.main]
}
output "arn" {
  value      = aws_kms_key.main.arn
  depends_on = [aws_kms_alias.main]
}

data "aws_caller_identity" "current" {}
