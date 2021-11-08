# 快速搭建 babel-tsx-to-js 项目
1. 初始化 npm 环境

    `# npm init -y`
2. 安装 preset 和 plugin

    `# npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript --save-dev`
    
    ---
    **@babel/cli**: babel 脚手架
    
    **@babel/core**: babel 底层源码
    
    **@babel/preset-env**: 负责将 **ES6+** 转化为 **ES5** 的 babel 插件集 
    
    **@babel/preset-react**: 负责将 **jsx** 转化为 **js** 的 babel 插件集 
    
    **@babel/preset-typescript**: 负责将 **tsx、ts** 转化为 **jsx、js** 的 babel 插件集 
    
    ---
3. 新建 babel 配置文件（与 package.json 同层）

    **babel.config.json**
    ```js
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "edge": "17",
              "firefox": "60",
              "chrome": "67",
              "safari": "11.1"
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.5"
          }
        ],
        [
          "@babel/preset-react"
        ],
        [
          "@babel/preset-typescript"
        ]
      ]
    }
    ```
4. 新建 src 文件夹

5. 添加 npm 命令

    **package.json**
    ```json
    {
      ...
      "scripts": {
        "build": "npx babel src --out-dir lib -x '.tsx,.ts,.jsx'"
      },
      ...
    }
    ```
    添加 `-x '.tsx,.ts,.jsx'` 是为了让 babel 在处理引入文件时不单单只把文件当作`.js`。如果没有添加，babel将会报错。
    
6. 设置转化出口（或叫作 npm 包入口）

    **package.json**
    ```json
    {
      ...
      "main": "./lib/index.js",
      "scripts": {
        "build": "npx babel src --out-dir lib -x '.tsx,.ts,.jsx'"
      },
      ...
    }
    ```
7. 将待转化代码放入src文件夹，执行 `npm run build`。转化后的代码将出现在 lib 文件夹中。

> Github Demo : 
# babel 配置

   ```json
    {
      "plugins":[
        "babel-plugin-transform-binary-expression", 
        [
          "@babel/plugin-transform-runtime",
          // 负责解决两个问题：
          // 1. 避免功能污染：假设这样一个场景，你开发了一个npm包，用到了Promise。其他人引用你的包，而他自己的代码修改了Promise，此时npm包中的Promise很有可能也被修改，从而功能失效。
          //    使用了"@babel/plugin-transform-runtime"，npm包中的Promise会被core-js的_promise所替换，从而不会被其他代码污染。
          // 2. 避免重复引用：当”@babel/preset-env“的useBuiltIns设置为"usage"，babel会对每个文件按需补充当前环境所缺失的polyfill，但有个缺点就是，即使不同的文件中有相同的缺失，也会重复补充，很浪费空间。
          //    该插件会提前使用require的方式引入polyfill，相当于有个公共地方引用polyfill，提高代码重用性，缩小编译后的代码体积
          {
            // "version": "7.14.8" // 对应core-js
            // "helpers": true, // 是否添加class的polyfill，默认为true
            // "regenerator": true,  // 是否添加regenerator的polyfill，默认为true

            "corejs": 3
            // core-js版本。设置2或3才能解决上面两个问题。默认值是false
            // 如果设置false，需`npm install --save @babel/runtime`
            // 如果设置2，需`npm install --save @babel/runtime-corejs2`
            // 如果设置3，需`npm install --save @babel/runtime-corejs3`
          }
        ],
        "@babel/plugin-syntax-dynamic-import", // 支持动态引入某些库
        [
          "import", // babel-plugin-import 按需加载组件和组件对应的样式
          {
            "libraryName": "antd",	// 包名，必填
            // "customName": (name, file) => {
            //   console.log('asdfasdf')
            //   const filename = file.opts.filename;
            //   if (name === 'TimePicker'){
            //     return 'antd/lib/custom-time-picker';
            //   }
            //   if (filename.indexOf('/path/to/my/different.js') >= 0) {
            //     return 'antd/lib/custom-name';
            //   }
            //   return `antd/lib/${name}`;
            // },
            "style": "css"  // true - 加载less样式, 'css' - 加载css样式
          }
        ]
      ],
      "presets": [
        [
          "@babel/preset-env", // 负责将所有非ES5语法的js转化为ES5
          {
            "targets": "> 0.25%, not dead", 
            // "targets": 表示兼容的浏览器范围。该属性可以用browserslist代替
            // "> 0.25%, not dead": 表示市场占有率超过0.25的浏览器；
            // "https://browserslist.dev": 用于查询浏览器占有率

            "useBuiltIns": "usage",
            // "useBuiltIns": 表示是否插入polyfill
            // "entry": 表示根据"target"属性插入所有polyfill，但需手动地在文件中添加"import 'core-js'"，而且只能添加一次
            // "usage": 表示根据"target"属性按需插入polyfill，且无需手动地在文件中添加"import 'core-js'"
            // "false": 默认值。表示不插入

            "corejs":3
            // "corejs": 2 | 3，表示版本号，推荐使用3，因为2已经不维护了，而且3更加全面，比如说支持了原型方法
          }
        ],
        [
          "@babel/preset-react", // 只负责转化jsx语法
          {
            // "pragma": "dom",
            // "pragma": 识别jsx，默认为 React.createElement，一般无需设置


            // "pragmaFrag": "DomFrag", 
            // "pragmaFrag": 识别"<></>"并替换，默认为 React.Fragment，一般无需设置

            // "throwIfNamespace": false
            // "throwIfNamespace": 默认为true，表示如果使用了XML命名空间标签，此参数用于设置是否抛出错误。"XML命名空间标签": <f:image />。一般无需设置

            // "useBuiltIns":false,
            // "development":false
          }
        ],
        [
          "@babel/preset-typescript",  // 转化ts为js
          {
            "isTSX":true, // 默认为false，表示是否支持tsx语法，如果为true，allExtensions也必须为true
            "allExtensions":true //默认为false，表示是否每个文件都应该被当做ts或tsx来转化
          }
        ]
      ]
    }
   ```
## presets和plugins的区别：
   presets是plugins的集合，比如实现react代码的转化，需要3个插件，那么每次配置时都要手动引入，比较麻烦，所以干脆合成一个preset

## plugin与preset执行顺序：
   1. 先执行完所有plugins，再执行presets;
   2. 多个plugin，按照声明次序顺序执行;
   3. 多个preset，按照声明次序逆序执行;