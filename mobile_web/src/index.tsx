import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import registerServiceWorker from './registerServiceWorker';
import 'antd-mobile/dist/antd-mobile.less';
import './index.less';

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);
registerServiceWorker();