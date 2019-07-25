import axios from 'axios';
import { BaseUrl } from 'utils/constants';
// axios 不支持 finally 的解决办法
require('promise.prototype.finally').shim();

// 添加留言 POST 方法
const addMessage = (params: object) => {
  return axios
    .post(`${BaseUrl}/api/message/add`, params)
    .then(response => {
      return response.data
    })
}

// 获取留言列表 GET 方法
const getMessageList = (params?: object) => {
  return axios
    .get(`${BaseUrl}/api/message/list`, { params })
    .then(response => {
      return response.data;
    })
}

export {
  addMessage,
  getMessageList
};