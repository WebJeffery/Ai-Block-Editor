# 快速开始


## 现代开发模式

安装：

```shell
npm i ai-block-ediotr
```

使用：

```typescript
import { AiEditor } from "ai-block-ediotr"
new AiEditor({
    element: "#aiEditor",
    placeholder: "点击输入内容...",
    content: 'BlockEditor 是一个支持 AI 的块富文本编辑器。 ',
    ai: {
        models: {
            spark: {
                appId: "***",
                apiKey: "***",
                apiSecret: "***",
            }
        }
    }
})
```

## 传统开发模式

传统开发模式分为 2 步：

- 1、通过 `link` 导入 ai-block-editor 的样式
- 2、通过 `<script type="module">` 初始化 AiEditor 实例

代码如下所示：

```html
<!doctype html>
<html lang="en">
<head>
    <title>AiEditor Demo</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="text/css" rel="stylesheet" href="ai-block-editor/style.css">
    <script type="module">
        import {AiEditor} from 'ai-block-editor/index.js'
        new AiEditor({
            element: "#aiEditor",
            placeholder: "点击输入内容...",
            content: 'AiEditor 是一个面向 AI 的下一代富文本编辑器。',
            ai: {
                models: {
                    spark: {
                        appId: "***",
                        apiKey: "***",
                        apiSecret: "***",
                    }
                }
            },
        })
    </script>
</head>
<body>

<div id="aiEditor" style="height: 550px;  margin: 20px"></div>

</body>
</html>
```

::: warning 注意
使用 `<script type="module">` 的导入方式，不支持 IE 浏览器。
:::

## 与 React 集成

在 React 中，我们通过使用 `useRef` Hook 得到 dom 节点，然后再通过 `new AiEditor` 进行实例化，示例代码如下：

```jsx
import {useEffect, useRef} from 'react'
import {AiEditor} from "ai-block-editor";
import "ai-block-editor/dist/style.css"

function App() {

    //定义 ref
    const divRef = useRef(null);

    //初始化 AiEditor
    useEffect(() => {
        if (divRef.current) {
            const aiEditor = new AiEditor({
                element: divRef.current,
                placeholder: "点击输入内容...",
                content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
            })
            return ()=>{
                aiEditor.destroy();
            }
        }
    }, [])

    return (
        <>
            <div>
                <h1>AiEditor，一个面向 AI 的富文本编辑器</h1>
            </div>
            <div ref={divRef} style={{height: "600px"}} />
        </>
    )
}

export default App
```



## 与 Vue 集成

在 Vue 中，我们通过 `ref` 属性定义 `div` 的 `$refs` 引用，然后再通过 `new AiEditor` 进行实例化，示例代码如下：

```html
<template>
    <div>
        <h1>AiEditor，一个面向 AI 的富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 600px"/>
</template>

<script lang="ts">
    import {AiEditor} from "ai-block-editor";
    import "ai-block-editor/dist/style.css"
    export default {
        mounted(){
            new AiEditor({
                element: this.$refs.divRef as Element,
                placeholder: "点击输入内容...",
                content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
            })
        }
    }
</script>
```

或者使用 `vue` 的 `setup` 语法：

```vue
<template>
  <div>
    <h1>AiEditor，一个面向 AI 的富文本编辑器</h1>
  </div>
  <div ref="divRef" style="height: 600px"/>
</template>

<script setup lang="ts">
import {AiEditor} from "ai-block-editor";
import "ai-block-editor/dist/style.css"
import {onMounted, onUnmounted, ref} from "vue";

const divRef = ref();
let aiEditor: AiEditor | null = null;

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。 ',
  })
})

onUnmounted(() => {
  aiEditor && aiEditor.destroy();
})
</script>
```
