# BlockEditor 是什么

BlockEditor 是一个块的富文本编辑器，使用过 notion、语雀、印象笔记软件对这种编辑风格比较熟悉


个人经常使用语雀写文章，非常喜欢它们的块富文本编辑器风格，想研究一下它的技术实现，开发一个块的富文本。研究了 [editorjs](https://editorjs.io/)、[wangeditor](https://www.wangeditor.com/)、[slatejs](https://docs.slatejs.org/)、[blocknote](https://www.blocknotejs.org/) 编辑器的源码，并在 editorjs、blocknote 源码上做过二开，说实话开发富文本难度很大，先讲讲我使用过后的感受：

- editorjs：使用 TS 面向对象封装，提供插件扩展机制，支持多个框架，比较大的缺点文本标记样式实现很困难：如添加字体颜色、背景、字体大小、链接实现起来困难，主要是 section 选区操作很困难，勉强能实现基本的富文本编辑功能
- slate.js：提供了编辑器核心逻辑，没有提供视图层，需要大量二次封装，wangeditor 就是基于它基础上实现的，现在 wangeditor 也不维护了
- blocknote：基于 [tiptap](https://tiptap.dev/docs/editor/introduction) 基础上实现， core 是核心逻辑代码，react 框架实现视图层，不能支持 vue 框架，可以基于 core 库实现，不过要添加新的功能，需要修改源码，扩展性不好


转了一圈下来，感觉 `tiptap` 是比较符合开发块富文本编辑器，它的插件生态也很丰富，一开始是使用 blocknote 二开，但项目使用 vue 框架，可以勉强使用 [veaury](https://github.com/devilwjp/veaury) 转为 vue 框架使用

直到我遇到了 [AiEditor](https://github.com/aieditor-team/AiEditor) 开源，像是发现了新大陆，它继承了几乎以上所有的优点

- 基于 TS 面向对象开发，使用 web component，与框架无关，可以使用在 Vue、React 框架上
- 使用 tiptap 框架，开发了工具栏
- 支持了富文本块的编辑

AiEditor 虽是一个开源项目，不过它也是一个商业化项目，pro 版本源码要付费，所以功能不可能全部开源，也不会花太多精力在新功能开源上，不过作者非常的有心了，富文本和 ai 基本功能都开源了，非常感谢～～


## 功能

编辑器目前有的基本功能，比如：

| 功能            | 描述                                                                    |
|---------------|-----------------------------------------------------------------------|
| **基础功能**      | 标题、正文、字体、字号、加粗、斜体、下划线、删除线、链接、行内代码、上标、下标、分割线、引用、打印                     |
| **增强功能**      | 撤回、重做、格式刷、橡皮擦（清除格式）、待办事项、字体颜色、背景颜色、Emoji 表情、对齐方式、行高、有（无）序列表、段落缩进、强制换行 |
| **附件功能**      | 支持图片、视频、文件功能，支持选择上传、粘贴上传、拖拽上传、支持拖动调整大小...                             |
| **代码功能**      | 行内代码、代码块、语言类型选择、**AI 自动注释**、**AI 代码解释**...                            |
| **Markdown**  | 标题、引用、表格、图片、代码块、**高亮块（类似 vuepress 的 :::）**、各种列表、粗体、斜体、删除线...          |
| **AI 功能**     | AI 续写、AI 优化、AI 校对、AI 翻译、自定义 AI 菜单及其 Prompts                           |
| **更多功能**      | 国际化、亮色主题、暗色主题、手机版适配、全屏编辑、@某某某（提及）...                                  |


待开发功能，比如：

* 团队协作
* AI 插入图片
* AI 图生图（AI 图片优化）
* AI 一键排版
* 进一步强化粘贴功能
* 上传视频自动获取缩略图
* WORD 导入、导出
* PDF 导出、PDF 预览
* 类腾讯文档 UI 风格
* 类 Notion 拖拽功能
* 更多的大模型对接：文心一言、ChatGPT