const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.user = !isEmpty(data.user) ? data.user : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.mail = !isEmpty(data.mail) ? data.mail : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  if (Validator.isEmpty(data.user)) {
    errors.user = '姓名不能为空';
  }

  if (!Validator.isMobilePhone(data.mobile)) {
    errors.mobile = '联系方式不合法';
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = '联系方式不能为空';
  }

  if (!Validator.isEmail(data.mail)) {
    errors.mail = '邮箱不合法';
  }

  if (Validator.isEmpty(data.mail)) {
    errors.mail = '邮箱不能为空';
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = '留言不能为空';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}