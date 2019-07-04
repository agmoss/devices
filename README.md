# devices_backend

> Fleet vehicle IoT simulation

A simple express backend on top of a DynamoDB database. The purpose of this project is to simulate a fleet of vehicles with IoT sensors. The sensor information is pushed to the database and then available for HTTPS requests via this REST interface. The REST endpoints serve as the foundation for a react/d3 data visualization front end. 

This is a work in progress.

## Install 

```
$ git clone https://github.com/agmoss/devices.git
$ cd devices
$ npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3005](http://localhost:3005) to view data in the browser.

### `npm devstart`
Runs the app with hot module reloading

### `npm docker` 
Script called by Docker file for build

### Endpoints

| Endpoint | Request Type | Description  |
| ------------- |:-------------:| :-----|
| {host}/signal/all| GET | Retuns all signal entries |
| {host}/signal/status/{status} | GET | Returns all signals of the given status |
| {host}/signal/assetun/{assetun}| GET | Returns all signals belonging to the given assetun |
| {host}/signal/assetun/{assetun}/status/{status}| GET |Returns all signals belonging to the given assetun and status|
| {host}/signal/add/| POST | Add a signal |
| {host}/signal/delete/{key} | DELETE | Deletes a signal by key |


### Deployment

This codebase can be deployed as a container via docker compose

```
$ docker-compose build
$ docker-compose up
```

Open [http://localhost:3005](http://localhost:3005) to view data in the browser.

## Built With

* [Express](https://expressjs.com/) - Micro Service framework 
* [dynamoose](https://dynamoosejs.com/) - Object relational mapping for DynamoDB
* [DynamoDB](https://aws.amazon.com/dynamodb/) - NoSQL database
* [Node.js v10.16.0](https://nodejs.org/en/) - JavaScript runtime
* [Docker](https://www.docker.com/) - Container platform

## Author

* **Andrew Moss** - *Creator* - [agmoss](https://github.com/agmoss)