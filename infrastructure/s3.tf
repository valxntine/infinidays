resource "aws_s3_bucket" "frontend" {
  bucket = "infinidays-frontend"

  tags = {
    Name = "infinidays-frontend"
  }
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.bucket

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_acl" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "PublicReadGetObject",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:GetObject",
        "Resource" : "arn:aws:s3:::infinidays-frontend/*"
      }
    ]
  })
}

resource "aws_iam_policy" "gh" {
  name        = "gh"
  description = "Policy for git hub action access to deploy to S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
        "s3:GetObject",
        "s3:Listbucket",
        "s3:PutObject"
        ]
        Sid = "AllowS3SyncCommand"
        Effect   = "Allow"
        Resource = [
            aws_s3_bucket.frontend.arn,
            "${aws_s3_bucket.frontend.arn}/*"
        ]
      },
    ]
  })
}

resource "aws_iam_group" "gh" {
  name = "s3-deploy-github-actions"
  path = "/users/"
}

resource "aws_iam_group_policy_attachment" "gh" {
  group = aws_iam_group.gh.name
  policy_arn = aws_iam_policy.gh.arn
}

resource "aws_iam_user" "gh" {
  name = "github-actions"
  path = "/system/"

  tags = {
    "Name" = "github-actions"
  }
}

resource "aws_iam_access_key" "gh" {
  user = aws_iam_user.gh.name
}

resource "aws_iam_group_membership" "gh" {
  name = "github-actions-group-membership"
  
  users = [aws_iam_user.gh.name]
  group = aws_iam_group.gh.name
}

output "github_actions_access_key_id" {
  value = aws_iam_access_key.gh.id
}

output "github_actions_secret" {
  value = aws_iam_access_key.gh.secret
  sensitive = true
}
