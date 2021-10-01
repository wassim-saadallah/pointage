FROM node:16-alpine3.11

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src /usr/app/src

# installing dependencies
RUN npm ci

# Bundle app source
RUN npm run build:prod

EXPOSE 3000
CMD [ "npm", "start" ]