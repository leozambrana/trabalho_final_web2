FROM mongo:latest

EXPOSE 27017

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin123
COPY init-mongo.js /docker-entrypoint-initdb.d/

CMD ["mongod"]
