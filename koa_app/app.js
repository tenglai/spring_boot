const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

// 实例化koa
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 引入users.js
const users = require('./routes/api/users');

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

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 设置端口号
const port = process.env.PORT || 5000;

// 监听端口号
app.listen(port, () => {
  console.log(`server started on ${port}`)
})