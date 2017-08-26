const Koa = require('koa');
const fs = require('fs');

const https = require('https');
const http  = require('http');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

options = {
    key: fs.readFileSync('.\\ssl\\ca-key.pem'),  //ssl文件路径
    cert: fs.readFileSync('.\\ssl\\ca-cert.pem')  //ssl文件路径
};

https.createServer(options,app.callback()).listen(443);
http.createServer(app.callback()).listen(3000);