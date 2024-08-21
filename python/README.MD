# Python3

## Build Image

```bash
docker build -t python3 .
```

## Build Container

Run this command in your web folder

```bash
docker run -d -i -v ${PWD}:/app --name python3-app python3
```

## Run python script with this build image
```bash
docker run --rm -it --privileged -v $(pwd):/app -w /app python3 python "$@"
```

## Run python script with Python3 Official
```bash
docker run --rm -it --privileged -v $(pwd):/home/dev/app -w /home/dev/app python:3 python "$@"
```