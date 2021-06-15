# Elastic Stack (Elasticsearch + Kibana)

Simple use from [official guideline](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html) for build test environment, learning, logging or something to want use

Run docker-compose to bring up the Elasticsearch cluster and Kibana:
```
docker-compose up
```

Submit a _cat/nodes request to see that the nodes are up and running:
```
curl -X GET "localhost:9200"
```

Open Kibana to load sample data and interact with the cluster: 
```
http://localhost:5601
```

When you’re done experimenting, you can tear down the containers and volumes by running 
```
docker-compose down -v
```