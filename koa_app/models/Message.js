/**
 * 留言数据模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模板
const MessageSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema);