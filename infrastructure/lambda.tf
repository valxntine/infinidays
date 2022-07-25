module "network" {
  source = "./modules/network"
}

module "postgres" {
  source = "./modules/db"
}

module "getTeam" {
  source = "./modules/lambda"

  network_configuration = module.network.network_config
  name                  = "getTeam"
  memory                = 512
  timeout_seconds       = 5 * 60
  environment = {
    DB_HOST     = module.postgres.host
    DB_USERNAME = module.postgres.username
    DB_PASSWORD = module.postgres.db_pass
    DB_NAME     = module.postgres.db_name
    DB_PORT     = module.postgres.port
  }
}

module "getUserDetails" {
  source = "./modules/lambda"

  network_configuration = module.network.network_config
  name                  = "getUserDetails"
  memory                = 512
  timeout_seconds       = 5 * 60
  environment = {
    DB_HOST     = module.postgres.host
    DB_USERNAME = module.postgres.username
    DB_PASSWORD = module.postgres.db_pass
    DB_NAME     = module.postgres.db_name
    DB_PORT     = module.postgres.port
  }
}
