# Vue-admin-plus 后台管理 前端通用框架

# Vue 3 + TypeScript + Vite

使用插件

`tailwindcss`
`@vueuse`
`sass`
`pinia`
`animae.css`
`axios`

图标库：图标库使用`iconify` https://icon-sets.iconify.design/ 调用Components内Icon组件使用


<p align="center">
</p>

## 目录结构
```javascript
aochen-admin-plus    
├── tsconfig.config.json  // typescript配置文件
├── tailwind.config.js    // tailwindcss配置文件
├── vite.config.ts        // vite配置文件
├── .eslintrc.js       // eslint配置文件
├── .env               // 全局环境变量配置
├── .env.development   // 开发环境变量配置 会覆盖.env中的变量 本地开发的时候用这个
├── .env.production    // 生产环境变量配置 会覆盖.env中的变量 生产部署的时候用这个
├── package.json       // 包管理文件
├── public             // 公共资源目录
│   ├── favicen.png    // 项目图标
│   └── index.html     // 项目渲染模板
├── src
│   ├── App.vue        // 项目主页面入口
│   ├── api            // 项目接口管理
│   ├── assets         // 项目静态资源目录
│   ├── components     // 项目公用组件
│   ├── config         // 项目配置
│   │   └── system.ts  // 系统配置文件
│   │   └── global.ts  // 接口配置文件
│   ├── directives     // vue自定义指令文件
│   ├── enum           // 枚举数据
│   ├── hook           // 钩子函数文件

│   ├── layout         // 框架及整体布局页面
│   ├── main.ts        // 项目总入口
│   ├── router
│   │   └── index.ts   // 项目路由
│   ├── store
│   │   └── index.ts   // 全局状态管理
│   ├── styles         // 全局样式管理
│   ├── utils          // 工具函数文件
│   │   └── caches     // 缓存管理封装方法
│   │   └── http       // 接口封装方法
│   └── views          // 项目内容页面
│   └── types          // 项目ts类型
└── README.md
```



