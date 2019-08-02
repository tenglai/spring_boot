/**
 * 留言信息
 */
const passport = require('koa-passport');
const Router = require('koa-router');
const router = new Router();

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
  // console.log(ctx.request.body);
  const { errors, isValid } = validateMessageInput(ctx.request.body);

  // 判断是否验证通过
  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }

  const newMessage = new Message({
    user: ctx.request.body.user,
    mobile: ctx.request.body.mobile,
    mail: ctx.request.body.mail,
    message: ctx.request.body.message
  });

  // 存储到数据库
  await newMessage.save().then(message => {
    ctx.status = 200;
    ctx.body = {
      data: message,
      msg: '保存成功'
    }
  }).catch(err => {
    ctx.status = 500;
    ctx.body = {
      data: err,
      msg: '保存失败'
    }
  })
});

/**
 * @route POST api/message/delete
 * @desc  删除留言接口地址
 * @access 接口是私密的
 */
router.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    // console.log(ctx.request.body);
    let _id = ctx.request.body.id;

    // 删除
    await Message.deleteOne({ _id: _id }).then(res => {
      ctx.status = 200;
      ctx.body = { msg: '删除成功' };
    }).catch(err => {
      ctx.status = 500;
      ctx.body = err;
    })
  });

/**
 * @route GET pi/message/list
 * @desc 获取留言列表接口地址
 * @access 接口是公开的
 */
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    // 查询
    const findResult = await Message.find({});

    ctx.status = 200;
    ctx.body = {
      list: findResult,
      msg: '查询成功'
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
    const findResult = await Message.find({ _id: ctx.query.id });
    const detail = findResult[0];
    if (detail) {
      ctx.status = 200;
      ctx.body = {
        detail,
        msg: '获取详情成功'
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        msg: '获取详情失败'
      }
    }
  }
);

module.exports = router.routes();