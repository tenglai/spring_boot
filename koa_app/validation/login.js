const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = '邮箱不合法';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = '邮箱不能为空';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password不能为空';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'password的长度不能小于6位且不能超过30位';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}