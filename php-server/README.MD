# Build

## Build Image

```bash
docker build -t nginx_php .
```

## Build Container

```bash
docker run -i -p 80:80 -v $PWD:/var/www --name http_php nginx_php
```
