# ExpressJS Boilerplate
Scaffold an express app development right away with popular toolchain ready.

## Technology Stack
- NodeJS
- ExpressJS
- MongoDB
- PassportJS
- Docker

## Features
- Persistent Database using MongoDB
- Local Authentication using username and password
- JWT Authentication using username and password
- API route
- Dockerized environment for development and production
- 404 page

## Prerequisites
- Install [NodeJS](https://nodejs.org/en/download/)
- Install Docker
	- [Mac](https://docs.docker.com/docker-for-mac/install/)
	- [Window](https://docs.docker.com/docker-for-windows/install/)
	- [Linux](https://docs.docker.com/engine/install/centos/)

## Get Started
This assuemes you have all the prerequisites ready.
1. `npm install` require packages.
2. `npm run init` to create a .env environment file. It is safe to regenerate same file with different value if necessary.
3. Start docker containers
	- Development mode: `npm run docker:up:dev`
	- Production mode: `npm run docker:up`
	- to build the Dockerfile while booting up append `-- --build`
4. Stop docker containers `npm run docker:down`

## Folder Structures
```
.
|__ scripts  				# where npm run scripts live
|__ docker-compose.*  		# docker config file for various environments
|__ Dockerfile 				# docker image to build
|__ services 				# workspaces 
|	|__ server 
|		|__ config	 		# general express app configuration, e.g. database, session, authorization
|		|__ passport 		# various strategise of PasswportJS
|		|__ controllers 	# controllers directory
|		|__	models			# models directory
|		|__ public			# static assets directory
|			|__ html 		# replace login and register page template here
|		|__ routes			# routes directory
|__
```

## TODO
- [ ] Third party authorization, e.g. Facebook & Google
- [ ] Deployment strategies  
- [x] static asssets
- [x] Login Page
- [x] Registration Page
- [x] 404 page