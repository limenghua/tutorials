const service = require('./mongo-service');
const server = require('./mongo-server');
const gateway = require('./tcp-gateway');

service.createServer(8000);
server.createServer(8080,"http://localhost:8000");
gateway.createServer(9000,"127.0.0.1",8000);