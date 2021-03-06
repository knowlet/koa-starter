[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/knowlet/koa-starter.svg?branch=develop)](https://travis-ci.org/knowlet/koa-starter)

# koa-starter

A sample and http2 ready koa2 starter template.

## Requirement

- node: 7.6 or higher
- yarn

## Development

The devServer mode will create controller when you add routing file in `routes` folder.

```sh
yarn dev
```
or use the pm2 watch mode (but won't create controller automatically).

```sh
yarn dev-pm2
```

## Testing

```sh
yarn test
```

## Production

```sh
yarn start
```

## DB Migration

### Starting a db

You can start a db by using docker

```sh
docker run --name koadb -p 3306:3306 --restart=always -e MYSQL_RANDOM_ROOT_PASSWORD=true -d mariadb:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
docker logs koadb 2>&1 | grep "GENERATED ROOT PASSWORD" | awk '{print $4}'
```

### Create databases

```sh
node_modules/.bin/sequelize db:create --config src/models/config.json
```


