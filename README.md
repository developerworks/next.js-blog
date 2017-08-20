
![clipboard.png](https://segmentfault.com/img/bVTh3x)

## 环境配置

这篇文章的环境是Windows, 正好也说一下Windows下前段开发的工具链

**1. 安装巧克力 https://chocolatey.org/install**

```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

**2. 安装Yarn**

安装Yarn包管理器会自动安装Nodejs.

**3. 创建项目**

```
md next.js-blog
cd next.js-blog
yarn init -y
# 安装依赖模块
yarn add express next@latest next-routes react react-dom styled-components
# 开发依赖模块
yarn add --dev babel-plugin-module-resolver babel-plugin-styled-components
```

`babel-plugin-module-resolver` 是一个Babel模块解析插件, 在`.babelrc`中可以配置模块的导入搜索路径. 比如:

```
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    ["styled-components", { "ssr": true, "displayName": true, "preprocess": false } ],
    ["module-resolver", {
      "root": ["./"]
    }]
  ]
}
```

因为`.babelrc`文件的路径在项目根, 我们指定配置`module-resolver`的`root`为"./", 因此我们在使用类似`import X from 'path'`导入模块的使用可以不指定`../../`这种相对路径, 默认以项目根为模块的搜索路径, 比如, 可以在`./pages/index.js`页面中导入位于`./layouts`的`DefaultLayout.js`模块,而不用添加`../`作为相对路径:


```js
// filename: ./pages/index.js

# 自动路径搜索
import DefaultLayout from 'layouts/DefaultLayout'
# 相对路径
import DefaultLayout from '../layouts/DefaultLayout'
```

上面两种导入方式效果是相同的, 第一种的前提是你要配置 `module-resolver`

## 样式

在这里我们使用 `styled-components` 组件, 关于`styled-components`如何使用, 请咨询 Google, 这里就不详细说明了, 使用上是很简单的.


## 创建布局页面

一个页面, 最基本的就是布局了, 页头, 内容, 页脚. 最基本的三块, 每个页面的页头和页脚基本都是相同的, 页头和页脚可以作为公共组件使用, 内容一般作为一个容器组件去包含我们实际需要显示的内容, 在这里实际上对于一个博客系统来说, 我们需要显示博客列表页和博客内容页.

```js
import Head from 'next/head'
import styled from 'styled-components';
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
// 定义一个DIV容器组件, 用于包裹整个页面.
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  main {
    flex: 1;
  }
`;
export default ({ children, title = '默认标题' }) => (
  <Container>
    <Head>
      <title>{ title }</title>
    </Head>
    <header>
      <Navigation />
    </header>
    <main>
      { children }
    </main>
    <Footer>
      这是页脚
    </Footer>
  </Container>
)

```

## 渲染博客列表页

```js
// export default () => (
//   <div>Welcome to next.js!</div>
// )
import React from 'react'

import DefaultLayout from 'layouts/DefaultLayout'
import Post from '../components/PostItem'

import posts from '../data/posts.json'

console.log(posts)

const IndexPage = ({ posts }) => (
  <DefaultLayout>
    <ul>
      {posts.map(p => (
        <Post key={p.title} post={p} />
      ))}
    </ul>
  </DefaultLayout>
)

IndexPage.getInitialProps = async ({ req }) => {
  // const res = await getPosts()
  // const json = await res.json()
  return { posts: posts }
}


export default IndexPage
```

## 关于 `_document.js`

另外在 `./pages`目录下还有一个特殊的文件`_document.js`, 用于控制整个页面的骨架. 这个自定义的 `_document.js` 可以让你覆盖默认的页面布局, 注入如你自己的样式, 等等.

## 获取数据

这里为了简化, 我只是使用了一个JSON文件, 其中包含了博客的标题, 连接等信息. 把`posts.json` 文件导入为一个JavaScript对象. 可以直接使用

## 代码仓库

https://github.com/developerworks/next.js-blog

> 注:
> Windows 下的Git命令注意设置一下: `git config --global core.autocrlf false`

## 最终效果

![clipboard.png](https://segmentfault.com/img/bVTh1f)

![clipboard.png](https://segmentfault.com/img/bVTh1h)

## 参考资料

- [Next.js通用动态路由][1] (何谓通用? 就是在服务器端和客户端都可以使用的路由)
- [Next.js仓库][2]


  [1]: https://github.com/fridays/next-routes
  [2]: https://github.com/zeit/next.js
