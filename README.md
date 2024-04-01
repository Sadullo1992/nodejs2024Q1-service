# Home Library Service

## Description

Home Library REST Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Go to `docker/db` branch
3. Install the required dependencies by running `npm install`
4. Containerization - docker compose: `npm run docker:up`
5. Put database environment variables to `.env` file

## Usage

1. Start the server by running one of the commands:

	- Development mode: `npm run start:dev`
	- Production mode: `npm run start:prod`

2. Access the API endpoints using a tool like Postman.

3. The API documented by Swagger (OpenAPI) on `/api` endpoint.

## Testing

After application running open new terminal and enter:

To run all tests without authorization: `npm run test`

To run all tests authorization: `npm run test:auth`

To run all tests authorization with refresh token: `npm run test:refresh`

## Docker 

 - docker compose up: `npm run docker:up`
 - docker compose build: `npm run docker:build`
 - docker compose down: `npm run docker:down`
 - vulnerabilities scanning: `npm run docker:cve`

## Typeorm & migrations

 - Generate migration: `npm run migration:generate` 
 - Running migration: `npm run migration:run` 
 - Reverting migration: `npm run migration:revert` 

## API Endpoints

#### Users
* `GET /user` - get all users.
* `GET /user/:id` - get single user by id
* `POST /user` - create user
* `PUT /user/:id` - update user's password
* `DELETE /user/:id` - delete user

#### Tracks
* `GET /track` - get all tracks
* `GET /track/:id` - get single track by id
* `POST /track` - create new track
* `PUT /track/:id` - update track info
* `DELETE /track/:id` - delete track

#### Artists
* `GET /artist` - get all artists
* `GET /artist/:id` - get single artist by id
* `POST /artist` - create new artist
* `PUT /artist/:id` - update artist info
* `DELETE /artist/:id` - delete artist

#### Albums
* `GET /album` - get all albums
* `GET /album/:id` - get single album by id
* `POST /album` - create new album
* `PUT /album/:id` - update album info
* `DELETE /album/:id` - delete album

#### Favorites
* `GET /favs` - get all favorites
* `POST /favs/track/:id` - add track to the favorites
* `DELETE /favs/track/:id` - delete track from favorites
* `POST /favs/album/:id` - add album to the favorites
* `DELETE /favs/album/:id` - delete album from favorites
* `POST /favs/artist/:id` - add artist to the favorites
* `DELETE /favs/artist/:id` - delete artist from favorites

## Technologies Used

- Node.js, Nestjs, Swagger, Typeorm, Postgresql, Docker