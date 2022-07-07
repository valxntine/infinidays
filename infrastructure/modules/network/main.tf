resource "aws_default_subnet" "subnetA" {
  availability_zone = "eu-west-2a"

  tags = {
    Name = "Default subnet for eu-west-2a"
  }
}

resource "aws_default_subnet" "subnetB" {
  availability_zone = "eu-west-2b"

  tags = {
    Name = "Default subnet for eu-west-2b"
  }
}

resource "aws_default_subnet" "subnetC" {
  availability_zone = "eu-west-2c"

  tags = {
    Name = "Default subnet for eu-west-2c"
  }
}

resource "aws_default_vpc" "vpc" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_default_security_group" "sg" {
  vpc_id = aws_default_vpc.vpc.id

  ingress {
    protocol  = -1
    self      = true
    from_port = 0
    to_port   = 0
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "network_config" {
  value = {
    vpc_id     = aws_default_vpc.vpc.id
    subnet_ids = [aws_default_subnet.subnetA.id, aws_default_subnet.subnetB.id, aws_default_subnet.subnetC.id]
  }
}

output "sg" {
  value = aws_default_security_group.sg.id
}
