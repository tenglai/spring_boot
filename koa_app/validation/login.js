const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = '邮箱不能为空';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password不能为空';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = 'password的长度不能小于8位且不能超过20位';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}