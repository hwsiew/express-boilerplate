# ExpressJS Boilerplate
Spin off your application development right away with the necessary function you need.

## Technology Stack
- NodeJS
- ExpressJS
- MongoDB

## Features
- Persistent Database using MongoDB
- Local Authentication using username and password
- API route

## How to
1. `npm run init` to create a .env environment file. It is safe to regenerate same file with different value if necessary.
2. Start docker containers
	- Development mode: `npm run docker:up:dev`
	- Production mode: `npm run docker:up`
	- to build the Dockerfile with booting up append `-- --build`
3. Stop docker containers `npm run docker:down`

## Folder Structures
* `scripts/ `: this is where the npm run scripts live 
* `docker-compose.* `: docker compose config file for various environment
* `Dockerfil `: docker image to build
* `server/ `: this is where all the backend related code live

## TODO
- [ ] 404 page
- [ ] static asssets