// 引入模块
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');
const send = require('koa-send');

// 实例化
const app = new Koa();

app.use(koaBody());

router.get('/', (ctx) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/download.html');
  ctx.body = fs.createReadStream(pathUrl);
});

router.get('/fileload/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `static/upload/${name}`;
  ctx.attachment(path);
  await send(ctx, path);
});

// 配置静态资源路径
app.use(static(path.join(__dirname)));

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口号
app.listen(3001, () => {
  console.log('server is listen in 3001');
});