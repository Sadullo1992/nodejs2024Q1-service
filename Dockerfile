FROM node:20.11-alpine as build

EXPOSE ${PORT}

WORKDIR /usr/app/

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install

COPY . .

FROM node:20.11-alpine

WORKDIR /usr/app/

COPY --from=build /usr/app /usr/app

CMD npm run typeorm:run && npm run start:dev