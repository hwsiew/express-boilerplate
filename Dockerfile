FROM node

WORKDIR /app

COPY package*.json .

# NODE_ENV value at build time will determine what npm install
ARG NODE_ENV 
RUN npm install 

# Copy server folder to container
COPY ./server ./server

ENV PORT 3000
EXPOSE ${PORT}

# default run time command
# override in docker compose file for development mode
CMD ["npm", "start"]