# BFF Starter

This is a starting point for creating a react app with a BFF pattern

## Layout

```bash
# Directory for all the react static site content
clint/
# Directory for all the node/express server content ( BFF )
server/
```

## Getting Started

```bash
# Install any deps
$ npm i

# Start up the node server and webpack dev server
$ npm run start:dev
```

Now go to localhost:3000 and you will see the app!

## Notes

```bash
$ npm run start:dev 
```

The above command will run two commands

1. 

```bash
$ npm run client:local
```

2. 

```bash
$ npm run server:local
```

The first will run a webpack-dev-server ( development server with hot reloading ).

The second will start up the bff ( express-app/node-server ) with the env variable `NODE_ENV=development`

