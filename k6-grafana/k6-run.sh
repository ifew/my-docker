docker run --rm --network host -i loadimpact/k6 \
	run - \
	-e K6_INFLUXDB_USERNAME=few \
	-e K6_INFLUXDB_PASSWORD=12345678 \
	-e K6_INFLUXDB_INSECURE=false \
	--out influxdb="http://localhost:8086/k6" \
	<k6-script.js