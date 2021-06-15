TEMPLATE_NAME ?= janus-webrtc-rtmp

build:
	@docker build -t ifew/$(TEMPLATE_NAME) .

build-nocache:
	@docker build --no-cache -t ifew/$(TEMPLATE_NAME) .

bash: 
	@docker run --net=host -v /home/ubuntu:/ubuntu --name="janus" -it -t ifew/$(TEMPLATE_NAME) /bin/bash

attach: 
	@docker exec -it janus /bin/bash

run: 
	@docker run --net=host --name="janus" -it -t ifew/$(TEMPLATE_NAME)

run-mac: 
	@docker run -p 80:80 -p 8088:8088 -p 8188:8188 --name="janus" -it -t ifew/$(TEMPLATE_NAME)

run-hide: 
	@docker run --net=host --name="janus" -it -t ifew/$(TEMPLATE_NAME) >> /dev/null