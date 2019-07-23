const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

// 引入Message
const Message = require('../../models/Message');

// 引入 input 验证密码
const validateMessageInput = require('../../validation/message');

/**
 * @route POST api/message/add
 * @desc 添加留言接口地址
 * @access 接口是公开的
 */
router.post('/add', async ctx => {
  const { errors, isValid } = validateMessageInput(ctx.request.body);

  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  const newMessage = new Message(ctx.request.body);

  // 存储到数据库
  await newMessage.save().then(user => {
    ctx.status = 200;
    ctx.body = {
      data: user,
      success: true,
      msg: '提交成功'
    };
  }).catch(err => {
    ctx.status = 500;
    ctx.body = {
      data: err,
      success: false,
      message: '提交失败'
    };
  });
});

/**
 * @route POST pi/message/list
 * @desc 获取留言列表接口地址
 * @access 接口是公开的
 */
router.post('/list', async ctx => {
  // 查询
  const findResult = await Message.find({});

  ctx.status = 200;
  ctx.body = {
    data: { list: findResult },
    success: true,
    msg: '获取列表数据成功'
  };
})

/**
 * @route GET api/message/detail
 * @desc  获取留言详情接口地址 返回获取留言详情
 * @access 接口是私密的
 */
router.get(
  '/detail',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    ctx.body = {
      data: {
        id: ctx.state.message.id,
        user: ctx.state.message.user,
        mobile: ctx.state.message.mobile,
        mail: ctx.state.message.mail,
        message: ctx.state.message.message
      },
      success: true,
      msg: '获取详情信息成功'
    };
  }
);

/**
 * @route GET api/message/delete
 * @desc  删除留言接口地址
 * @access 接口是私密的
 */
router.get(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    ctx.body = {
      success: true,
      msg: '删除成功'
    };
  }
);

module.exports = router.routes();