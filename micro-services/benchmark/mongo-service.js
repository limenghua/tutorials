const Koa = require('koa');
const mongo = require('koa-mongo');
const Router = require('koa-router');

function createServer(port) {
    const router = new Router();
    const app = new Koa();

    router.get('/hello', async function (ctx, next) {
        ctx.body = 'hello world';
    });

    router.get('/', async function (ctx, next) {
        ctx.body = await ctx.mongo.db('AA').collection('users').find().toArray();
    });

    app.use(mongo());
    app.use(router.middleware());
    app.listen(port);
}

exports.createServer = createServer;