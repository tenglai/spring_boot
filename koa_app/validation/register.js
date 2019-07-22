const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '名字的长度不能小于2位且不能超过30位';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}