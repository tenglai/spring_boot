/**
 * 用户信息
 */
const tools = require('../../config/tools'); // 加密函数
const bcrypt = require('bcryptjs'); // 加密
const gravatar = require('gravatar'); // 头像
const jwt = require('jsonwebtoken'); // token
const keys = require('../../config/keys');
const passport = require('koa-passport');
const Router = require('koa-router');
const router = new Router();

// 引入User
const User = require('../../models/User');

// 引入 input 验证密码
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
  ctx.status = 200;
  ctx.body = { msg: 'users works...' };
});

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
  // console.log(ctx.request.body);
  const { errors, isValid } = validateRegisterInput(ctx.request.body);

  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  // 通过邮箱判读是否注册过
  const findResult = await User.find({ mobile: ctx.request.body.mobile });
  // console.log(findResult);
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = { msg: '邮箱已被占用 ' };
  } else {
    const avatar = gravatar.url(ctx.request.body.email, { s: '200', r: 'pg', d: 'mm' });
    const newUser = new User({
      name: ctx.request.body.name,
      mobile: ctx.request.body.mobile,
      email: ctx.request.body.email,
      avatar,
      password: tools.enbcrypt(ctx.request.body.password)
    });

    // console.log(newUser);
    // 存储到数据库
    await newUser.save().then(user => {
      ctx.status = 200;
      ctx.body = {
        data: user,
        msg: '新增成功'
      };
    }).catch(err => {
      ctx.status = 500;
      ctx.body = {
        data: err,
        msg: '新增失败'
      };
    });

    // 返回json数据
    // ctx.body = newUser;
  }
});

/**
 * @route POST api/users/login
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
  const { errors, isValid } = validateLoginInput(ctx.request.body);

  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  // 查询
  const findResult = await User.find({ mobile: ctx.request.body.mobile });
  const user = findResult[0];
  const password = ctx.request.body.password;

  // 判断差没查到
  if (findResult.length == 0) {
    ctx.status = 404;
    ctx.body = { msg: '用户不存在!' };
  } else {
    // 查到后 验证密码
    var result = await bcrypt.compareSync(password, user.password);

    // 校验通过
    if (result) {
      // 返回token
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      const token = jwt.sign(payload, keys.secretOrkey, { expiresIn: 3600 });

      ctx.status = 200;
      ctx.body = { msg: '查询成功', token: 'Bearer ' + token };
    } else {
      ctx.status = 400;
      ctx.body = { msg: '密码错误' };
    }
  }
})

/**
 * @route GET api/users/current
 * @desc  用户信息接口地址 返回用户信息
 * @access 接口是私密的
 */
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    ctx.body = {
      id: ctx.state.user.id,
      name: ctx.state.user.name,
      mobile: ctx.state.user.mobile,
      email: ctx.state.user.email,
      avatar: ctx.state.user.avatar
    };
  }
);

module.exports = router.routes();