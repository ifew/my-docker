FROM mongo:3.4 as gow_db
#VOLUME /Users/ifew/mongodb_data:/data/db
#WORKDIR /data/db
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=sck@1711
ENV MONGO_GOW_DATABASE=gow
ENV MONGO_GOW_USER=gow
ENV MONGO_GOEW_PASSWORD=sck@1711
COPY mongo_init.js /root/mongo_init.js
EXPOSE 27017
ENTRYPOINT ["mongo"]
#CMD mongo < /root/mongo_init.js



#docker run --name gow_db -v /Users/ifew/mongodb_data:/data/db -p 27017:27017 -d mongo:3.4 