resource "aws_s3_bucket" "frontend" {
  bucket = "infinidays-frontend"
  acl    = "public-read"

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


  website {
    index_document = "index.html"
  }

  tags = {
    Name = "infinidays-frontend"
  }
}

