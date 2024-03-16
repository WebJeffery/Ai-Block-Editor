import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: "B-Editor",
    description: "支持 AI 的块富文本编辑器",
    titleTemplate: ':title 块富文本编辑器',
    lastUpdated: true,

    themeConfig: {
        logo: '/assets/image/logo.png',
        editLink: {
            pattern: 'https://github.com/WebJeffery/Ai-Block-Editor',
            text: '编辑当前页面'
        },
        search: {
            provider: 'local'
        },
        outline: {
            label: '章节',
        },
        nav: [
            {text: '首页', link: '/'},
            {text: '开发文档', link: 'zh/what-is-ai-editor'},
            {
                text: 'Demo 示例', link: 'example/guide'
            },
            {
                text: 'github', link: 'https://github.com/WebJeffery/Ai-Block-Editor'
            },
        ],

        sidebar: {
            '/zh/': {
                text: '编辑器开发文档',
                items: [
                    {
                        text: '简介',
                        items: [
                            {text: 'BlockEditor 是什么', link: '/zh/what-is-ai-editor'},
                            {text: '快速开始', link: '/zh/getting-started'}
                        ]
                    },
                    {
                        text: '配置',
                        items: [
                            {text: '基础', link: '/zh/config/base'},
                            {text: '工具栏', link: '/zh/config/toolbar'},
                            {text: '图片', link: '/zh/config/image'},
                            {text: '视频', link: '/zh/config/video'},
                            {text: '附件', link: '/zh/config/attachment'},
                            {text: '字体', link: '/zh/config/fontFamily'},
                            {text: '字号', link: '/zh/config/fontSize'},
                            {text: '提及', link: '/zh/config/mention'},
                            {text: '超链接', link: '/zh/config/link'},
                            {text: '国际化', link: '/zh/config/i18n'},
                            {text: '只读模式', link: '/zh/config/editable'},
                            {text: '自定义布局', link: '/zh/config/layout'},
                        ]
                    },
                    {
                        text: 'AI',
                        items: [
                            {text: 'AI 配置', link: '/zh/ai/base'},
                            {text: 'AI 菜单', link: '/zh/ai/menu'},
                            {text: 'AI 命令', link: '/zh/ai/command'},
                            {text: '代码块 AI', link: '/zh/ai/codeblock'},
                        ]
                    },
                    {
                        text: 'API',
                        items: [
                            {text: 'BlockEditor', link: '/zh/api/aieditor'},
                        ]
                    },
                ]
            },
            '/example/': {
                text: 'Demo 示例',
                items: [
                    {text: '基本示例', link: '/example/guide'},
                ]
            }
        },

        footer: {
            message: 'Released under the LGPL-v2.1 License.',
            copyright: 'Copyright © 2024-present BlockEditor. ',
        },
    },

    head: [
        ['link', {rel: 'icon', href: '/assets/image/logo.png'}],
        // ["script",
        //     {},
        //     `var _hmt = _hmt || [];
        //     (function() {
        //       var hm = document.createElement("script");
        //       hm.src = "https://hm.baidu.com/hm.js?9fd447a0f9e62a84d1b752a2cacb2c6b";
        //       var s = document.getElementsByTagName("script")[0];
        //       s.parentNode.insertBefore(hm, s);
        //     })();`
        // ],
    ],
})
