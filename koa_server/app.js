// 引入模块
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');

// 实例化
const app = new Koa();

app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
    multipart: true // 是否支持 multipart-formdate 的表单
  }
}));

const uploadUrl = "http://localhost:3001/static/upload";

// 配置路由
router.get('/', (ctx) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/upload.html');
  ctx.body = fs.createReadStream(pathUrl);
});

// 上传文件
router.post('/upload', (ctx) => {
  // 获取上传文件
  const file = ctx.request.files.file;
  console.log(file);
  // 读取文件流
  const fileReader = fs.createReadStream(file.path);
  console.log(fileReader);
  // 设置文件保存路径
  const filePath = path.join(__dirname, '/static/upload/');
  // 组装成绝对路径
  const fileResource = filePath + `/${file.name}`;

  /**
   * 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
   */
  const writeStream = fs.createWriteStream(fileResource);
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fileReader.pipe(writeStream);
        ctx.body = {
          url: uploadUrl + `/${file.name}`,
          code: 0,
          message: '上传成功'
        };
      }
    });
  } else {
    fileReader.pipe(writeStream);
    ctx.body = {
      url: uploadUrl + `/${file.name}`,
      code: 0,
      message: '上传成功'
    };
  }
});

// 配置静态资源路径
app.use(static(path.join(__dirname)));

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口号
app.listen(3001, () => {
  console.log('server is listen in 3001');
});