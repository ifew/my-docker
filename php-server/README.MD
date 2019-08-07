# Build

## Build Image

```bash
build -t php-server .
```

## Build Container

```bash
docker run -i -p 80:80 -v $PWD:/var/www --name google-speech php-server
```
