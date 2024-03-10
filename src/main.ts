import { AiEditor } from "./core/AiEditor.ts";

// @ts-ignore
window.aiEditor = new AiEditor({
    element: "#aiEditor",
    placeholder: "点击输入内容1...",
    // 是否开启缓存
    contentRetention: false,
    // 工具栏配置，跟产品沟通开放的功能
    toolbarKeys: ["undo", "redo", "brush", "eraser", "divider", "heading", "bold", "italic", "underline"
        , "strike", "link", "code", "divider", "align", "line-height", "divider", "bullet-list", "ordered-list", "quote",
        "indent-decrease", "indent-increase", "fullscreen"
    ],
    // editable:false,
    content: 'AiEditor 是一个面向 AI 的下一代富文本编辑器。<p> <strong>提示：</strong> <br/>1、输入 空格 + "/" 可以快速弹出 AI 菜单 <br/> 2、输入 空格 + "@" 可以提及某人</p> ',
    onSave:()=>{
        alert("保存")
        return true;
    },
    // ai: {
    //     models: {
    //     //     spark: {
    //     //         ...config
    //     //     },
    //     //     wenxin: {
    //     //         ...wenxinConfig
    //     //     }
    //     },
    //     // bubblePanelEnable:false,
    //     bubblePanelModel: "spark",
    //     onTokenConsume: (modelName, _modelConfig, count) => {
    //         console.log(modelName, " token count:" + count)
    //     }

    // },
    i18n: {
        zh: {
            "undo": "撤销(可自定义国际化内容...)",
            "redo": "重做(可自定义国际化内容!)",
        }
    },
    // onMentionQuery: (query) => {
    //     return [
    //         'Michael Yang', 'Jean Zhou', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder'
    //         , 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John'
    //         , 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey'
    //         , 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
    //     ]
    //     // .filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
    // }
})
