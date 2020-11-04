# Build

## Build Image

```bash
docker build -t nginx_php:7.2 .
```

## Build Container

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www --name http_php72 --net db_network nginx_php:7.2
```
