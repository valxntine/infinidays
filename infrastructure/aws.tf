terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.70.0"
    }
  }
  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "ou"
  region  = "eu-west-2"
}
