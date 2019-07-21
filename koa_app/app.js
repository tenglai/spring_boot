const Koa = require('koa');
const Router = require('koa-router');

// 实例化koa
const app = new Koa();
const router = new Router();

// 路由
router.get('/', async (ctx) => {
  ctx.body = {
    msg: 'Hello Koa Interfaces'
  }
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 设置端口号
const port = process.env.PORT || 5000;

// 监听端口号
app.listen(port, () => {
  console.log(`server started on ${port}`)
})