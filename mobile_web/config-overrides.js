const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    apps: path.resolve(__dirname, 'src/apps'),
    utils: path.resolve(__dirname, 'src/utils'),
    Images: path.resolve(__dirname, 'src/assets/images')
  }),
  fixBabelImports('import', {
    libraryName: 'ant-mobile',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
);