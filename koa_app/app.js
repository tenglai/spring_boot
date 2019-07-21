const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');

// 实例化koa
const app = new Koa();
const router = new Router();

// 路由
router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello Koa Interfaces' };
});

// config
const db = require('./config/keys.js').mongoURI;

// 连接数据库
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongodb Connected...');
  })
  .catch(err => {
    console.log(err);
  })

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 设置端口号
const port = process.env.PORT || 5000;

// 监听端口号
app.listen(port, () => {
  console.log(`server started on ${port}`)
})