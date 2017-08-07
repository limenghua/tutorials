const Koa = require('koa');
const mongo = require('koa-mongo');

const app = new Koa();

app.use(mongo());

app.use(async ctx=>{
    ctx.body = await ctx.mongo.db('AA').collection('users').find().toArray();
});

app.listen(3000);