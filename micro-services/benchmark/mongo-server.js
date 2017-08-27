const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const Client = require('node-rest-client').Client;

function createServer(port,apiAddr) {
    const client = new Client();

    async function restCall(url) {
        return new Promise(function (resolve, reject) {
            client.get(url, function (data, response) {
                resolve(data);
            });
        });
    }

    router.get('/hello', async function (ctx, next) {
        let res = await restCall(apiAddr + "/hello");
        ctx.body = res.toString();
    });

    router.get('/', async function (ctx, next) {
        ctx.body = await restCall(apiAddr + "/");
    });

    app.use(router.middleware());

    app.listen(port);
}

exports.createServer = createServer;