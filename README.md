![html2wxml](https://www.qwqoffice.com/html2wxml/images/html2wxml.jpg)

# html2wxml微信小程序富文本组件

## 效果

![html2wxml截图](https://www.qwqoffice.com/html2wxml/images/html2wxml-screenshot.png "html2wxml截图")

## 参考

小程序富文本解析 [https://github.com/icindy/wxParse](https://github.com/icindy/wxParse "https://github.com/icindy/wxParse")

PHP移植版highlight.js [https://github.com/scrivo/highlight.php](https://github.com/scrivo/highlight.php "https://github.com/scrivo/highlight.php")

PHP编写的Markdown解析器 [https://github.com/erusev/parsedown](https://github.com/erusev/parsedown "https://github.com/erusev/parsedown")

## 演示

扫码打开演示小程序

![html2wxml演示小程序](https://www.qwqoffice.com/html2wxml/images/html2wxml-qrcode.jpg "html2wxml演示小程序")

## 用法

### 插件版本准备

**1. 打开小程序管理后台，转到设置 - 第三方服务，点击添加插件**
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-1.png "添加小程序插件")

**2. 搜索 `html2wxml` ，选中并添加**
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-2.png "添加小程序插件")

**3. 添加成功**
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-3.png "添加小程序插件")

**4. 回到小程序开发环境，编辑 `app.json` ，添加插件声明，最新版为 `1.1.0`**

    	"plugins": {
    		"htmltowxml": {
    			"version": "1.1.0",
    			"provider": "wxa51b9c855ae38f3c"
    		}
    	}

**5. 在对应页面的 `json` 文件，比如首页 `index.json`，添加使用插件组件的声明**

    	"usingComponents": {
    		"htmltowxml": "plugin://htmltowxml/view"
    	}

**6. 参考下面组件使用方法**

### 组件版本准备

**1. 复制整个 `html2wxml-component` 文件夹到小程序目录**

**2. 在对应页面的 `json` 文件，比如首页 `index.json`，添加使用组件的声明，注意路径**

    	"usingComponents": {
    		"htmltowxml": "path/to/html2wxml-component/html2wxml"
    	}

### 组件使用（适用于插件版本和组件版本）

#### 属性介绍

| 属性名 | 类型 | 默认值 | 说明 |
| :------------ | :------------ | :------------ | :------------ |
| text | String | null | 要渲染的HTML或Markdown文本 |
| json | Object | {} | 已经过解析的JSON数据 |
| type | String | html  | 要渲染的文本类型，可用值`html`,`markdown`,`md` |
| highlight | Boolean | true | 是否对`pre`内文本进行语法着色 |
| linenums | Boolean | true | 是否为`pre`添加行号显示 |
| padding | Number | 5 | `html2wxml`组件与屏幕边缘的单边距离，用于图片自适应 |
| imghost | String | null | 对`img`标签中`src`属性可能的相对路径进行域名补全 |
| bindWxmlTagATap | Handler |  | 点击`a`标签的回调 |

#### 示例

    // 将Page中的content数据作为HTML格式渲染
    <htmltowxml text="{{content}}" bindWxmlTagATap="wxmlTagATap" />
    
    // 禁用代码高亮功能
    <htmltowxml text="{{content}}" highlight="{{false}}" bindWxmlTagATap="wxmlTagATap" />
    
    // 禁用代码行号显示功能
    <htmltowxml text="{{content}}" linenums="{{false}}" bindWxmlTagATap="wxmlTagATap" />
    
    // 对HTML数据中的img标签的相对路径补全域名
    <htmltowxml text="{{content}}" imghost="https://www.qwqoffice.com" bindWxmlTagATap="wxmlTagATap" />
    
    // 将Page中的text数据作为Markdown格式渲染
    <htmltowxml text="{{text}}" type="md" bindWxmlTagATap="wxmlTagATap" />
    
    // 直接渲染Page中的已经过解析的obj数据
    <htmltowxml json="{{obj}}" bindWxmlTagATap="wxmlTagATap" />
