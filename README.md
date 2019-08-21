# CMS-handyman-server Demo for Navitas
# Restful: Swagger UI: https://handyman-cms.herokuapp.com/api-docs/#/


You need to add a `env.json` file to your root directory, with the following content to do test 
```
{
  "default": {
    "DB_HOST": "127.0.0.1",
    "DB_DATABASE": "handy-demo",
    "DB_PORT": 27017,
    "JWT_KEY": "hello",
  },
  "test": {
    "DB_DATABASE": "handy-demo_test",
    "PORT": 
  },
  "MongoDB atlas": {
    "DB_HOST": "your host",
    "DB_PASSWORD": "your password",
    "DB_USER": "your username"
  }
}
