# gulp项目配置

该配置基于NodeJs以及gulp，需安装相应的环境，最新的NodeJs即可

```markdown
NodeJs > 8
```

编辑器建议使用vscode，同时搭配Live Server插件，可以达到热刷新的效果

## 使用

```node
# 安装所需的npm包
npm install

# 开发环境
npm run dev

# 生产环境，文件打包至dist文件夹
npm run build

# 如需压缩js
npm run build:uglify
```

## 项目结构

```tree
scyd-epg-ott-6.0.0-h5                               // 项目名称
├─ .browserslistrc                                  // css兼容配置
├─ dist                                             // 生产环境文件
├─ gulpfile.js                                      // gulp配置文件
├─ node_modules                                     // npm包
├─ package-lock.json                                //
├─ package.json                                     // npm包版本管理
├─ README.md                                        // 说明文档
└─ src                                              // 源代码
   ├─ activity                                      // 活动页文件夹名称
   │  └─ 20190520_tv_dkcj_activity                  //
   │     ├─ css                                     //
   │     ├─ home.html                               //
   │     ├─ img                                     //
   │     └─ js                                      //
   ├─ column                                        // 栏目文件夹
   │  ├─ 20181220_tv_mfzq500_column                 // 具体栏目名称
   │  │  ├─ css                                     //
   │  │  ├─ home.html                               //
   │  │  ├─ img                                     //
   │  │  └─ js                                      //
   ├─ common                                        // 公共文件夹
   │  ├─ com_bottom.html                            // 公共底部
   │  ├─ com_head.html                              // 公共头部
   │  ├─ com_tip.html                               // Epg.tip所需的dom元素
   │  ├─ css                                        //
   │  │  ├─ common_hd.css                           // 公共css
   │  ├─ img                                        // 公共image
   │  └─ js                                         // 公共js
   │     ├─ common_1.0.2.js                         //
   │     ├─ com_bottom.js                           //
   │     ├─ com_head.js                             //
   │     ├─ core_2.0.3.js                           // 核心core.js
   │     ├─ references                              // lib库
   │     │  ├─ jquery-3.2.1.min.js                  //
   │     │  ├─ jquery.barrage.js                    //
   │     │  ├─ md5base64.js                         //
   │     │  ├─ qrcode.min.js                        //
   │     │  └─ template-native.js                   //
   │     ├─ scyd                                    //
   │     │  └─ contant.js                           //
   │     └─ vplayer.js                              // 播放器js
   └─ config.js                                     // 配置文件

```
