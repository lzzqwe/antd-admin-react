

### 文档结构

```
│  .gitignore
│  config-overrides.js
│  package.json
│  README.md
│  tree.txt
│  yarn.lock
│  
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
│      
└─src
    │  App.js
    │  index.js 入口文件
    │  style.js
    │  
    ├─api
    │      aiax.js  axios 封装
    │      index.js   api请求
    │      
    ├─assset
    │  └─img
    │          bg.jpg
    │          
    ├─components 公用组件目录
    │  ├─header
    │  │      index.js 头部组件
    │  │      style.js
    │  │      
    │  ├─left-nav
    │  │      index.js  左侧导航组件
    │  │      style.js
    │  │      
    │  └─link-button
    │          index.js 按钮组件
    │          style.js
    │          
    ├─config
    │      formateTime.js  时间的格式化函数
    │      memoryUtils.js  用户对象
    │      menu.js   左侧导航菜单对象
    │      storage.js localstorage 的增删改查
    │      
    └─page  路由组件
        ├─admin
        │      index.js 
        │      
        ├─category
        │      add-form.js
        │      index.js
        │      update-form.js
        │      
        ├─charts
        │      bar.js
        │      line.js
        │      pie.js
        │      
        ├─home
        │      bar.js
        │      index.js
        │      line.js
        │      style.js
        │      
        ├─login
        │      index.js
        │      style.js
        │      
        ├─not-found
        │      index.js
        │      
        ├─order
        │      index.js
        │      
        ├─product
        │      add-update.js
        │      detail.js
        │      home.js
        │      index.js
        │      pictures-wall.js
        │      rich-text-editor.js
        │      
        ├─role
        │      add-form.js
        │      auth-form.js
        │      index.js
        │      
        └─user
                index.js
                user-form.js
```

### 如何运行

```
//安装依赖
npm i
//运行
npm run start
```

### 技术栈

- react
- Ant Design
- react-router-dom
- style-component
- axios
- jsonp     

该项目是一个电商后台管理系统，后台是用express+mongodb搭建的 前端 react+ Ant Design 

### 前端实现的页面

- 登录页面
- 添加用户
- 权限管理
- 添加、更新、获取、删除用户
- 添加、获取、更新商品分类
- 添加、更新、上架/下架商品
- 上传、删除图片
- 实时获取天气预报
- 获取商品的分页列表
- 根据ID/Name搜索产品分页列表
- 添加、获取、更新角色
- echarts图表     
- 富文本编辑器

### 作为一个前端 通过该项目学习到了什么

- JavaScript
  * Promise的使用 利用promise封装axios以及Promise.all()的使用
  *   async 函数的使用
  * 数组 reduce push find indexOf map
  * 字符串 indexOf
  * 三目运算 if else条件选择语句
  * 内置对象Date的使用(格式化时间)
  * setInterval 计时器的使用
  * localStorage的使用
- React
  - JSX 
  - 组件的封装 父组件向子组件传值 props的使用
  - 生命周期 componentwillmount  componentDidMount  componentWillUnmount componentWillReceiveProps 的使用
  -  使用 PropTypes 进行类型检查 
  -  refs 的使用
  - 事件处理 条件渲染
-  Ant Design 
  -  `antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。 经过学习该项目 熟练使用了**以下组件**
  - Layout 布局 , Modal对话框,message全局提示,Menu导航菜单,
  -  Cascader 级联选择
  -  DatePicker 日期选择
  - Form 表单, Input输入框 ,Button按钮 , Icon图标
  - Card 卡片, Table表格 ,Pagination 分页 
  - Result 结果, tree  树形控件,  Statistic 统计数值
  -  Upload 图片上传 select选择器