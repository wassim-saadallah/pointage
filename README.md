# Pointage

an API to save Employees checkin/checkout
## Assignement

Read [the assignment](Node_Mid.md)

## Run locally (for development)

```bash
$ npm run build:dev &
$ npm run dev
```

If on windows, in one terminal run
```ps
> npm run build:dev
```
And in another terminal run 
```ps
> npm run build:dev
```
## Run tests
### unit tests
```bash
$ npm test
```

### End-to-End tests
```bash
$ npm run test:e2e
```

## Docker installation

```bash
$ cd pointage
$ docker build -t pointage .
$ docker run pointage
```

## Todo

- [x] create a test for checkin/checkout
- [x] create routes for employees
- [x] create routes for checkin/checkout
  - [x] investigate schema error but still validate in /checkout: no explanation yet
- [x] integration tests (using node-fetch): scenario definition and execution
- [x] refactor code (add documentation where necessary)
- [x] add swagger API docuemntation
- [ ] add dockerfile
  - [x] add .env and according changes
- [ ] Documentation in readme


