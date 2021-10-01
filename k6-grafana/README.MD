1. Create folder ```grafanadb_data``` and ```influxdb_data``` in same docker-compose.yml file
2. Run ```docker-compose up -d```
3. Run ```sh k6-run.sh```
4. Go to Grafana at http://localhost:3000/
5. Click add data source, select InfluxDB
6. Config URL as http://influxdb:8086/ and InfluxDB Detail
7. Create Dashboard and config for monitoring k6 result (https://k6.io/docs/results-visualization/influxdb-+-grafana/#custom-grafana-dashboard)