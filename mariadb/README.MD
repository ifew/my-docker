# Create Container by command
1. Change mapping directory "D:/Docker/db_mariadb"
2. Change root password "MYSQL_ROOT_PASSWORD=1234"

```
docker network create db_network
```

## MariaDB latest
```
docker run --name db_mariadb -v /Users/ifew/Database/db_mariadb:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_ROOT_HOST=% -e TZ=Asia/Bangkok -d -p 3306:3306 --net db_network mariadb
```