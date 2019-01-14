## 申请使用注意事项

**插件版本解析服务是由 `QwqOffice` 完成，存在不稳定因素，如对稳定性有很高的要求，请自行搭建解析服务，或在自家服务器上直接完成解析。对于有关插件版本不能使用/不能解析的提问，不作任何回答**

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

## 小程序端用法

### 三种版本演示

三种版本演示所用的小程序源码均在demo目录中

### 插件版本准备

1. 打开小程序管理后台，转到设置 - 第三方服务，点击添加插件
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-1.png "添加小程序插件")

2. 搜索 `html2wxml` ，选中并添加
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-2.png "添加小程序插件")

3. 添加成功
![添加小程序插件](https://www.qwqoffice.com/html2wxml/images/plugin-3.png "添加小程序插件")

4. 回到小程序开发环境，编辑 `app.json` ，添加插件声明，最新版为 `1.3.0`

		"plugins": {
			"htmltowxml": {
				"version": "1.3.0",
				"provider": "wxa51b9c855ae38f3c"
			}
		}

5. 在对应页面的 `json` 文件，比如首页 `index.json`，添加使用插件组件的声明

		"usingComponents": {
			"htmltowxml": "plugin://htmltowxml/view"
		}

6. 参考下面组件使用方法

### 组件版本准备

1. 复制整个 `html2wxml-component` 文件夹到小程序目录

2. 在对应页面的 `json` 文件，比如首页 `index.json`，添加使用组件的声明，注意路径

		"usingComponents": {
			"htmltowxml": "path/to/html2wxml-component/html2wxml"
		}

3. 参考下面组件使用方法

### 模板版本准备

1. 复制整个 `html2wxml-template` 文件夹到小程序目录

2. 在对应页面的 `js` 文件，比如首页 `index.js`，添加引用声明，并使用`html2wxml`方法进行数据绑定，注意路径，参数分别为绑定的数据名、已解析的富文本数据、当前页面对象和容器与屏幕边缘的单边的距离

		var html2wxml = require('path/to/html2wxml-template/html2wxml.js');
		html2wxml.html2wxml('article', res.data, this, 5);

3. 在对应页面的 `wxml` 文件，比如首页 `index.wxml`，添加引用模板的声明，并使用模板，注意路径和绑定的数据名

		<import src="path/to/html2wxml-template/html2wxml.wxml" />
		<template is="html2wxml" data="{{wxmlData:article}}" />

4.  在对应页面的 `wxss` 文件，比如首页 `index.wxss`或`app.wxss`， 引入样式表和你喜欢的代码高亮样式，注意路径

		@import "path/to/html2wxml-template/html2wxml.wxss";
		@import "path/to/html2wxml-template/highlight-styles/darcula.wxss";

### 组件使用方法（仅适用于插件版本和组件版本）

#### 属性介绍

| 属性名 | 类型 | 默认值 | 说明 |
| :------------ | :------------ | :------------ | :------------ |
| text | String | null | 要渲染的HTML或Markdown文本 |
| json | Object | {} | 已经过解析的JSON数据 |
| type | String | html  | 要渲染的文本类型，可用值`html`,`markdown`,`md` |
| highlight | Boolean | true | 是否对`pre`内文本进行代码高亮 |
| highlightStyle | String | darcula | `pre`代码高亮样式，可用值`default`,`darcula`,`dracula`,`tomorrow` |
| highlightLanguages | Array | ['html', 'js', 'css', 'php'] | `pre`代码高亮检测语言。[查看可用语言](#可用的代码高亮语言) |
| linenums | Boolean | true | 是否为`pre`添加行号显示 |
| padding | Number | 5 | `html2wxml`组件与屏幕边缘的单边距离，用于图片自适应 |
| imghost | String | null | 对`img`标签中`src`属性可能的相对路径进行域名补全 |
| showLoading | Boolean | true | 是否显示加载中动画 |
| bindWxmlTagATap | Handler |  | 点击`a`标签的回调 |

#### 示例

    // 将Page中的content数据作为HTML格式渲染
    <htmltowxml text="{{content}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 禁用代码高亮功能
    <htmltowxml text="{{content}}" highlight="{{false}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 禁用代码行号显示功能
    <htmltowxml text="{{content}}" linenums="{{false}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 代码高亮样式改为tomorrow
    <htmltowxml text="{{content}}" highlightStyle="tomorrow" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 设置代码高亮检测语言 (最多6个，自行搭建服务不受限制)
    <htmltowxml text="{{content}}" highlightLanguages="{{['html','js','php','css','cpp','ruby']}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 对HTML数据中的img标签的相对路径补全域名
    <htmltowxml text="{{content}}" imghost="https://www.qwqoffice.com" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 禁用加载中动画
    <htmltowxml text="{{content}}" showLoading="{{false}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 将Page中的text数据作为Markdown格式渲染
    <htmltowxml text="{{text}}" type="md" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>
    
    // 直接渲染Page中的已经过解析的obj数据
    <htmltowxml json="{{obj}}" bindWxmlTagATap="wxmlTagATap" ></htmltowxml>

## 服务端用法

富文本的解析默认是由QwqOffice完成，存在不稳定因素，你可以自行搭建解析服务或将解析组件引入到你的项目中。

1. 复制整个 `html2wxml-php` 文件夹到项目目录中

2. 引入类文件`class.ToWXML.php`

		include( 'path/to/html2wxml-php/class.ToWXML.php' );

3. 实例化`html2wxml`，进行解析并输出，示例：

		$towxml = new ToWXML();
		$json = $towxml->towxml( '<h1>H1标题</h1>', array(
			'type' => 'html',
			'highlight' => true,
			'linenums' => true,
			'imghost' => null,
			'encode' => false,
			'highlight_languages' => array( 'html', 'js', 'php', 'css' )
		) );
		echo json_encode( $json, JSON_UNESCAPED_UNICODE );

### 参数介绍

| 参数名 | 类型 | 默认值 | 说明 |
| :------------ | :------------ | :------------ | :------------ |
| text | String |  | 要渲染的HTML或Markdown文本 |
| args | Array | [] | 附加参数 |

### args 参数介绍

| 参数名 | 类型 | 默认值 | 说明 |
| :------------ | :------------ | :------------ | :------------ |
| type | String | html  | 要渲染的文本类型，可用值`html`,`markdown`,`md` |
| highlight | Boolean | true | 是否对`pre`内文本进行代码高亮 |
| highlight_languages | Array | ['html', 'js', 'css', 'php'] | `pre`代码高亮检测语言。[查看可用语言](#可用的代码高亮语言) |
| linenums | Boolean | true | 是否为`pre`添加行号显示 |
| imghost | String | null | 对`img`标签中`src`属性可能的相对路径进行域名补全 |
| encode | Boolean | true | 是否对结果进行JSON编码 |

## 可用的代码高亮语言

语言名称和别名均可使用

| 语言名称 | 别名 |
| :------------ | :------------ |
| 1c | |
| abnf | |
| accesslog | |
| actionscript | as |
| ada | |
| apache | apacheconf |
| applescript | osascript |
| arduino | |
| armasm | arm |
| asciidoc | adoc |
| aspectj | |
| autohotkey | ahk |
| autoit | |
| avrasm | |
| awk | |
| axapta | |
| bash | sh,zsh |
| basic | |
| bnf | |
| brainfuck | bf |
| cal | |
| capnproto | capnp |
| ceylon | |
| clean | clean,icl,dcl |
| clojure-repl | |
| clojure | clj |
| cmake | cmake.in |
| coffeescript | coffee,cson,iced |
| coq | |
| cos | cos,cls |
| cpp | c,cc,h,c++,h++,hpp |
| crmsh | crm,pcmk |
| crystal | cr |
| cs | csharp |
| csp | |
| css | |
| d | |
| dart | |
| delphi | dpr,dfm,pas,pascal,freepascal,lazarus,lpr,lfm |
| diff | patch |
| django | jinja |
| dns | bind,zone |
| dockerfile | docker |
| dos | bat,cmd |
| dsconfig | |
| dts | |
| dust | dst |
| ebnf | |
| elixir | |
| elm | |
| erb | |
| erlang-repl | |
| erlang | erl |
| excel | xlsx,xls |
| fix | |
| flix | |
| fortran | f90,f95 |
| fsharp | fs |
| gams | gms |
| gauss | gss |
| gcode | nc |
| gherkin | feature |
| glsl | |
| go | golang |
| golo | |
| gradle | |
| groovy | |
| haml | |
| handlebars | hbs,html.hbs,html.handlebars |
| haskell | hs |
| haxe | hx |
| hsp | |
| htmlbars | |
| http | https |
| hy | hylang |
| inform7 | i7 |
| ini | toml |
| irpf90 | |
| java | jsp |
| javascript | js,jsx |
| jboss-cli | wildfly-cli |
| json | |
| julia-repl | |
| julia | |
| kotlin | |
| lasso | ls,lassoscript |
| ldif | |
| leaf | |
| less | |
| lisp | |
| livecodeserver | |
| livescript | ls |
| llvm | |
| lsl | |
| lua | |
| makefile | mk,mak |
| markdown | md,mkdown,mkd |
| mathematica | mma |
| matlab | |
| maxima | |
| mel | |
| mercury | m,moo |
| mipsasm | mips |
| mizar | |
| mojolicious | |
| monkey | |
| moonscript | moon |
| n1ql | |
| nginx | nginxconf |
| nimrod | nim |
| nix | nixos |
| nsis | |
| objectivec | mm,objc,obj-c |
| ocaml | ml |
| openscad | scad |
| oxygene | |
| parser3 | |
| perl | pl,pm |
| pf | pf.conf |
| php | php3,php4,php5,php6 |
| pony | |
| powershell | ps |
| processing | |
| profile | |
| prolog | |
| protobuf | |
| puppet | pp |
| purebasic | pb,pbi |
| python | py,gyp |
| q | k,kdb |
| qml | qt |
| r | |
| rib | |
| roboconf | graph,instances |
| routeros | routeros,mikrotik |
| rsl | |
| ruby | rb,gemspec,podspec,thor,irb |
| ruleslanguage | |
| rust | rs |
| scala | |
| scheme | |
| scilab | sci |
| scss | |
| shell | console |
| smali | smali |
| smalltalk | st |
| sml | ml |
| sqf | sqf |
| sql | |
| stan | |
| stata | do,ado |
| step21 | p21,step,stp |
| stylus | styl |
| subunit | |
| swift | |
| taggerscript | |
| tap | |
| tcl | tk |
| tex | |
| thrift | |
| tp | |
| twig | craftcms |
| typescript | ts |
| vala | |
| vbnet | vb |
| vbscript-html | |
| vbscript | vbs |
| verilog | v,sv,svh |
| vhdl | |
| vim | |
| x86asm | |
| xl | tao |
| xml | html,xhtml,rss,atom,xjb,xsd,xsl,plist |
| xquery | xpath,xq |
| yaml | yml,YAML,yaml |
| zephir | zep |

## 来源
QwqOffice软件工作室 [https://www.qwqoffice.com/](https://www.qwqoffice.com/ "https://www.qwqoffice.com/")

QwqOffice官网小程序（文章详情页富文本解析由 `html2wxml` 提供）

![QwqOffice小程序](https://www.qwqoffice.com/html2wxml/images/qwqoffice-qrcode.jpg "QwqOffice小程序")

## 赞赏
![赞赏码](https://www.qwqoffice.com/html2wxml/images/admiring-qrcode.png "赞赏码")
