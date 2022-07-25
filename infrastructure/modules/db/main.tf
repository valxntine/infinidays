resource "random_password" "main" {
  length = 16
  special = false
}

resource "aws_db_instance" "main" {
  allocated_storage = 10
  engine = "postgres"
  engine_version = "13"
  instance_class = "db.t4g.micro"
  db_name = "infinidays"
  username = "postgres"
  password = random_password.main.result
  publicly_accessible = true
}

output "db_pass" {
  value = random_password.main.result
}

output "username" {
  value = aws_db_instance.main.username
}

output "db_name" {
  value = aws_db_instance.main.db_name
}

output "host" {
  value = aws_db_instance.main.address
}

output "port" {
  value = aws_db_instance.main.port
}
