# 目录结构
```
    src
    |_ components  //组件
    |_ env         //环境变量
    |_ pages       //小程序定义的page目录
    |_ static      //静态文件
        |_ font    //字体图标
        |_ js      //第三方js插件
        |_ image   //图片
    |_ utils       //常用工具
    |_ app.js       
    |_ app.json      
    |_ app.less      
    |_ project.config.json 
    |_ sitemap.json 
```

### 文件类型
- page/components
    + wxml
    + less -> wxss
    + json 
    + js

- env/utils
    + js

- static
    + js
    + imgs(png jpg jpeg ico svg)
    + fontFiles

- root
    - js
    - json
    - less -> wxss


### gulp工作流

    1. page/components 中的wxml需要监听
    2. page/components 中的less需要编译监听
    3. page/components 中的js需要监听
    4. page/components 中的json需要监听

    5. env/utils 中的js需要监听 打包压缩

    6.static中的文件原封不动，图片文件可考虑压缩

    7.根目录下的less需编译，其余监听


