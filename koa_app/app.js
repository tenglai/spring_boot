// 引入模板
const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const cors = require('koa2-cors');

// 实例化koa
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 允许跨域访问
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

// 引入users.js
const users = require('./routes/api/users');
// 引入messages.js
const messages = require('./routes/api/messages');

// 路由
router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello Koa Interfaces' };
});

// config
const db = require('./config/keys').mongoURI;

// 连接数据库
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongodb Connected...');
  })
  .catch(err => {
    console.log(err);
  })

// 初始化 passport
app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require('./config/passport')(passport);

// 配置路由地址 localhist:5000/api/users
router.use('/api/users', users);
router.use('/api/message', messages);

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 设置端口号
const port = process.env.PORT || 5000;

// 监听端口号
app.listen(port, () => {
  console.log(`server started on ${port}`)
})