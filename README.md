# sof-project
sof-project初始化
# 克隆
  git clone https://github.com/deng565430/sof-project.git
  
# 进入项目
  cd sof-project
  
# 安装依赖的包 
  npm install
  
# 启动项目
  npm run dev

# 打包
  npm run build
  
# 入口
  http://localhost:8080/#/

# 数据结构

└─build：构建用到的相关文件
├─config：构建的配置文件
├─src：前端开发源码
│   ├─assets：图片等静态资源
│   ├─components：前端组件
│   │   ├─footer/底部组件
│   │   ├─header/头部组件
│   │   └─index/中间身体组件
│   │   │   ├─analysis/分析报告组件
│   │   │   ├─client-management/客户管理组件
│   │   │   ├─client-order/客户下单组件
│   │   │   ├─phone-manage/电话管理组件
│   │   │   └─index.vue 主体入口页面
│   │   ├─login/登录组件
│   │   └─leftMenu/公共组件
│   ├─router：前端路由
│   ├─store：vuex的store
│   ├─App.vue：应用的外层结构
│   └─main.js：应用的入口文件
└─static：前端开发过程中用到的静态文件
