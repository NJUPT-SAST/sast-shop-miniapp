# SAST-SHOP SAST 周边商店小程序
每年 sast 都会制作会服，并且之后还会有更多周边推出，故设计sast周边商店小程序便于售卖

## 小程序技术选择
在小程序上，选择了兼容React语法的Taro框架进行开发

## 目录结构介绍
```
./sast-shop-miniapp
├── README.md——————————————说明文档
├── babel.config.js————————babel配置
├── config—————————————————webpack设置
├── dist———————————————————生成的产物
├── node_modules———————————下载的包
├── package.json———————————项目配置
├── pnpm-lock.yaml—————————pnpm管理器
├── project.config.json————项目配置
├── project.tt.json————————项目配置
├── src————————————————————主要写代码的地方
|  ├── app.config.ts———————项目配置
|  ├── app.scss————————————全局样式
|  ├── app.ts——————————————项目的入口
|  ├── index.html——————————入口html
|  └── pages———————————————页面代码
|     ├── index————————————主页
|     ├── login————————————登录页
|     ├── me———————————————我的订单页面
|     ├── order-detail—————订单详情
|     ├── order-form———————信息填写支付页面
|     └── product-detail———商品详情
├── tsconfig.json——————————typescript配置
└── types——————————————————类型文件
   └── global.d.ts—————————全局类型
```

# 项目开发
本项目使用的是pnpm作为包管理器，如果你还没有安装pnpm，使用以下命令安装：
```bash
npm i -g pnpm
```
本项目使用git，并且main分支受到保护，无法直接提交，如果要开始写代码的话请自己创建一个新的分支来编写。分支的命名规则是 `dev-你的英文名字` 比如说 `dev-max`

## 需要掌握的知识
- TypeScript
- React
- SCSS基本使用
- Taro的基本组件
- Taro的路由功能
- Taro的网络请求
- Taro的状态管理
- 微信小程序部分api

## 项目依赖安装
在开始开发之前，使用以下命令安装依赖
```bash
pnpm i
```
## 项目开发调试
使用以下命令开始项目调试
```bash
pnpm dev:weapp
```

## 项目打包
使用以下命令开始项目打包
```bash
pnpm build:weapp
```

# 附录
- [Taro 官方文档](https://docs.taro.zone/docs/)
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [SAST Shop 飞书文档](https://njuptsast.feishu.cn/wiki/wikcn4LfQWNebHdNEQUIuToaf5d)