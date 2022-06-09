# Install Kong OSS (Database version) and Konga UI for Docker by Manual 

(follow this readme, and not nessesary to use my docker-compose file)

## Install Kong

### Create Network
```
 docker network create kong-net
```

### Create Database
```
docker run -d --name kong-database \
  --network=kong-net \
  -p 5432:5432 \
  -e "POSTGRES_USER=kong" \
  -e "POSTGRES_DB=kong" \
  -e "POSTGRES_PASSWORD=kongpass" \
  postgres:9.6
  ```

### Preparing Database
```
docker run --rm --network=kong-net \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=kong-database" \
  -e "KONG_PG_PASSWORD=kongpass" \
 kong:2.8.1-alpine kong migrations bootstrap
```

### Create Kong Container
```
docker run -d --name kong-gateway \
  --network=kong-net \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=kong-database" \
  -e "KONG_PG_USER=kong" \
  -e "KONG_PG_PASSWORD=kongpass" \
  -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
  -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
  -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
  -e "KONG_PROXY_LISTEN=0.0.0.0:8000, 0.0.0.0:8443 ssl" \
  -e "KONG_PLUGINS=bundled, basic-auth, key-auth, oauth2, hmac-auth, jwt, cors, session, rate-limiting, prometheus, proxy-cache,bot-detection, ip-restriction, acl, request-size-limiting, response-ratelimiting, response-transformer, request-transformer, file-log, http-log, tcp-log, udp-log, syslog" \
  -p 8000:8000 \
  -p 8443:8443 \
  -p 8001:8001 \
  -p 8444:8444 \
  kong:2.8.1-alpine
  ```

  ### Verify Kong is Work!
  ```
curl -i -X GET --url http://localhost:8001/services
 ```

 ### Clean up Kong Docker
 ```
docker kill kong-gateway
docker kill kong-database
docker container rm kong-gateway
docker container rm kong-database
docker network rm kong-net
```

## Install Konga

### Preparing database
```
docker run --rm --network=kong-net pantsel/konga -c prepare -a postgres -u postgresql://kong:kongpass@kong-database:5432/konga_db
```

### Create Konga Container
```
docker run -d -p 1337:1337 \
     --network=kong-net \
     -e "DB_ADAPTER=postgres" \
     -e "DB_HOST=kong-database" \
     -e "DB_USER=kong" \
     -e "DB_PASSWORD=kongpass" \
     -e "DB_DATABASE=konga_db" \
     -e "KONGA_HOOK_TIMEOUT=120000" \
     -e "NODE_ENV=production" \
     --name konga \
     pantsel/konga:latest
```

### Access to Admin UI
```
http://konga.localhost:1337/
```

### Config
1. Use default connection (Name: Kong, URL: http://localhost:8001/ )

```
curl -i -X POST \
  --url http://localhost:8001/apis/ \
  --data 'name=myifew' \
  --data 'hosts=api.localhost' \
  --data 'upstream_url=https://myifew.com'
````

### Install Plugin
  curl -X POST http://localhost:8001/plugins \
    --data "name=file-log"  \
    --data "config.path=/tmp/file.log" \
    --data "config.reopen=false"

  curl -X POST http://localhost:8001/plugins/ \
      --data "name=proxy-cache"  \
      --data "config.response_code=200" \
      --data "config.request_method=GET" \
      --data "config.request_method=HEAD" \
      --data "config.content_type=text/plain" \
      --data "config.content_type=application/json" \
      --data "config.cache_ttl=300" \
      --data "config.strategy=memory"