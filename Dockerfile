FROM node

WORKDIR /app

# Copy service folder to container
COPY ./services ./services

# Copy root package.json
COPY package*.json .

# NODE_ENV value at build time will determine what npm install
ARG NODE_ENV 
RUN npm install 

ENV PORT 3000
EXPOSE ${PORT}

# default run time command
# override in docker compose file for development mode
CMD ["npm", "start", "--workspace", "express-server"]