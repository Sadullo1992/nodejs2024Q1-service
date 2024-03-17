FROM node:20.11-alpine

EXPOSE ${PORT}

WORKDIR /usr/app/

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install

COPY . .