resource "aws_db_instance" "main" {
  allocated_storage = 10
  engine = "postgres"
  engine_version = "13"
  instance_class = "db.t4g.micro"
  db_name = "infinidays"
  username = "postgres"
  password = "valentine"
}

output "username" {
  value = aws_db_instance.main.username
}

output "password" {
  value = aws_db_instance.main.password
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
