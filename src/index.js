import React from 'react';

import ReactDOM from 'react-dom';

import './style'

import App from './App';

import storageUtils from './config/storage'
import memoryUtils from './config/memoryUtils'

// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'));

