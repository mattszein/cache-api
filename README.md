# cache-api
FashionCloud coding challenge 

## Used tools
- Docker: help development process and deployment for production.

###### BACKEND:
- nodejs: nodejs with express library for mount the api web server.
- helmet: secure Express.js apps.
- mongoose: library to connect with MongoDB and allow schema/model/validation.
- Mocha / Chai / Supertest: test code libraries.
- dotenv: library that loads environment variables from '.env' file.
- nodemon: library used only in development that allow hot reloading.
- typescript: extends JavaScript by adding types.

## Getting Started

Clone the respository:
```
git clone https://github.com/mattszein/cache-api.git
```

Go to the folder:
```
cd /path-in-your-computer/cache-api
```

Then:

```
git pull
```

Create .env file and add secrets (add your own credentials), this example work with docker-compose.yml:
```
PORT=8081
MONGO_USERNAME=root
MONGO_PASSWORD=rootpass
MONGO_HOSTNAME=db
MONGO_PORT=27017
MONGO_DB=cache-api
TTL=86400000
```

Build image:

```
docker-compose build
```

Run server:
```
docker-compose up
```

Check api with curl:

```
curl http://localhost:8081/
```

Run tests:
```
docker-compose run cache-api /bin/bash npm test
```

## TODO
- Fix Test
- Create controllers and move logic from routes to controllers
- Add error handling manager
- add create and develop route / controller
- fix duplication code (ttl) 
- test routes
