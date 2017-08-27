start node.exe index.js
ab -n 1000 -c 100  http://127.0.0.1:8000/
ab -n 1000 -c 100  http://127.0.0.1:8080/
ab -n 1000 -c 100  http://127.0.0.1:9000/
ab -n 1000 -c 100  http://127.0.0.1:8000/hello/
ab -n 1000 -c 100  http://127.0.0.1:8080/hello/
ab -n 1000 -c 100  http://127.0.0.1:9000/hello/