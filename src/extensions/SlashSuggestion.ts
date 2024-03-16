import {Extension} from '@tiptap/core'
import { groupBy } from '../util/lodash.ts';
import {t} from "i18next";

import Suggestion, {SuggestionOptions, SuggestionProps} from './suggestion/index.ts'


import tippy, {Instance} from "tippy.js";
import {AiModelManager} from "../ai/AiModelManager.ts";
import {AiEditorOptions} from "../core/AiEditor.ts";
import {DefaultAiMessageListener} from "../ai/core/DefaultAiMessageListener.ts";
import {AiMenu} from "../ai/AiGlobalConfig.ts";
import { Boot } from '../editor/Boot.ts';
import { createElement } from '../util/dom.ts';

export type AiCommandOptions = {
    HTMLAttributes?: Record<string, any>
    suggestion: Omit<SuggestionOptions, 'editor'>
    editorOptions: AiEditorOptions
}


// export const defaultCommands = [
//     {
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 19V21H19V19H21ZM17 19V21H15V19H17ZM13 19V21H11V19H13ZM9 19V21H7V19H9ZM5 19V21H3V19H5ZM21 15V17H19V15H21ZM5 15V17H3V15H5ZM5 11V13H3V11H5ZM16 3C18.6874 3 20.8817 5.12366 20.9954 7.78322L21 8V13H19V8C19 6.40893 17.7447 5.09681 16.1756 5.00512L16 5H11V3H16ZM5 7V9H3V7H5ZM5 3V5H3V3H5ZM9 3V5H7V3H9Z" fill="currentColor"></path></svg>',
//         name: "AI 续写",
//         prompt: "请帮我继续扩展一些这段话的内容",
//         model: "spark",
//     },
//     {
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 5.25C16.7949 5.25 18.25 3.79493 18.25 2H19.75C19.75 3.79493 21.2051 5.25 23 5.25V6.75C21.2051 6.75 19.75 8.20507 19.75 10H18.25C18.25 8.20507 16.7949 6.75 15 6.75V5.25ZM4 7C4 5.89543 4.89543 5 6 5H13V3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V12H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z" fill="currentColor"></path></svg>',
//         name: "AI 提问",
//         prompt: "",
//         model: "spark",
//     },
//     {
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 15V17C5 18.0544 5.81588 18.9182 6.85074 18.9945L7 19H10V21H7C4.79086 21 3 19.2091 3 17V15H5ZM18 10L22.4 21H20.245L19.044 18H14.954L13.755 21H11.601L16 10H18ZM17 12.8852L15.753 16H18.245L17 12.8852ZM8 2V4H12V11H8V14H6V11H2V4H6V2H8ZM17 3C19.2091 3 21 4.79086 21 7V9H19V7C19 5.89543 18.1046 5 17 5H14V3H17ZM6 6H4V9H6V6ZM10 6H8V9H10V6Z" fill="currentColor"></path></svg>',
//         name: "AI 翻译",
//         prompt: "请帮我把这段内容翻译为英语，直接返回英语结果",
//         model: "spark",
//     },
//     {
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L11.9132 14.8422L9 11.9289L5 15.928V19H15.533L16.2414 19.0012L17.57 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z" fill="currentColor"></path></svg>',
//         name: "AI 生图",
//         prompt: "请根据以上的内容，生成一张图片，并把图片返回给我",
//         model: "spark",
//     },
// ] as AiMenu[];

export const SlashMenuSuggestion = Extension.create<AiCommandOptions>({
    name: 'slashMenuSuggestion',
    // @ts-ignore
    addOptions() {
        return {
            suggestion: {
                char: '/',
                command: ({editor, range, props}) => {
                    editor.chain().focus().deleteRange(range).run();

                    if (props && props.aiItem) {
                        let aiCommand = props.aiItem as AiMenu;
                        const selectedText = editor.state.selection.$head.parent.textContent;
                        const aiModel = AiModelManager.get(aiCommand.model!);
                        if (aiModel) {
                            aiModel?.chat(selectedText, aiCommand.prompt!, new DefaultAiMessageListener(editor));
                        } else {
                            console.error("Ai model config error.")
                        }
                    } else {
                        Boot.toolbarConfig[props.type]?.execute(editor)
                        editor?.commands.focus()
                    }
                },

                render: () => {
                    let popup: Instance[];
                    let selectIndex: number = -1;
                    // 默认选中段落
                    let defaultIndex: number = -1
                    let blockKey: string[] = []
                    let suggestionProps: SuggestionProps;
                    const toolbarGroup = groupBy(Object.values(Boot.toolbarConfig), (i) => i.group)
                    let element: HTMLDivElement = createElement('div',
                        {
                            className: 'suggestion',
                            innerHTML: `
                            <div class="slash-container">
                                ${Object.keys(toolbarGroup).map((groupKey) => {
                                    let groupTitle = `<div class="slash-group">${t(groupKey)}</div>`
                                    let groupContent = toolbarGroup[groupKey].map((item) => {
                                        let className = 'slash-container-item item'

                                        if (!item.disabled && !item.hide) {
                                            blockKey.push(item.name)
                                        }
                                        if (item.name === 'paragraph') {
                                            defaultIndex = blockKey.length - 1
                                        }

                                        if (blockKey[selectIndex] === item.name) {
                                            className += ' active'
                                        }

                                        if (item.disabled) {
                                            className += ' aie-disable'
                                        }

                                        return item.hide ? '' : `<div class="${className}" data-type="${item.name}">
                                            <div class="ai-item-icon">
                                                ${item.icon}
                                            </div>
                                            <div class="ai-item-text">
                                                <div class="ai-item-name">${t(item.name)}</div>
                                                <div class="ai-item-desc">${t(item.desc)}</div>
                                            </div>
                                        </div>`
                                    }).join('')
                                    return groupContent ? groupTitle + groupContent : ''
                                }).join('')}
                                </div>
                                `
                        }
                    ) as HTMLDivElement;
                    // let container = createElement('div', { className: 'slash-container' })
                    // Object.keys(toolbarGroup).map((groupKey) => {
                    //     let groupTitle = `<div class="slash-group">${t(groupKey)}</div>`
                    //     let groupContent = toolbarGroup[groupKey].map((item) => {
                    //         let className = 'slash-container-item item'

                    //         if (!item.disabled && !item.hide) {
                    //             blockKey.push(item.name)
                    //         }
                    //         if (item.name === 'paragraph') {
                    //             defaultIndex = blockKey.length - 1
                    //         }

                    //         if (blockKey[selectIndex] === item.name) {
                    //             className += ' active'
                    //         }

                    //         if (item.disabled) {
                    //             className += ' aie-disable'
                    //         }

                    //         return item.hide ? '' : `<div class="${className}" data-type="${item.name}">
                    //             <div class="ai-item-icon">
                    //                 ${item.icon}
                    //             </div>
                    //             <div class="ai-item-text">
                    //                 <div class="ai-item-name">${t(item.name)}</div>
                    //                 <div class="ai-item-desc">${t(item.desc)}</div>
                    //             </div>
                    //         </div>`
                    //     }).join('')
                    //     return groupContent ? groupTitle + groupContent : ''
                    // })
                    
                    element.addEventListener("click", (e) => {
                        const closest = (e.target as HTMLElement).closest(".item");
                        const selectType = closest?.getAttribute("data-type");
                        const toolbar = Boot.toolbarConfig[selectType]
                        if (toolbar && !toolbar.disabled) {
                            suggestionProps.command({
                                type: selectType
                            })
                        }
                    })

                    const updateElement = () => {
                        const allItems = element.querySelectorAll('.slash-container-item')
                        Array.from(allItems).forEach(dom => dom.classList.remove('active'))
                        const targetDom = element.querySelector(`[data-type=${blockKey[selectIndex]}]`)

                        targetDom && targetDom.classList.add('active')
                    }

                    return {
                        onStart: (props: SuggestionProps) => {
                            suggestionProps = props;
                            
                            if (!props.clientRect) {
                                return
                            }
                            selectIndex = defaultIndex

                            updateElement();
                            // @ts-ignore
                            popup = tippy('body', {
                                getReferenceClientRect: props.clientRect,
                                appendTo: () => {
                                    return props.editor.view.dom.closest(".aie-container")
                                },
                                content: element,
                                offset: [30,-24],
                                showOnCreate: true,
                                interactive: true,
                                allowHTML: true,
                                trigger: 'manual',
                                placement: 'right-start',
                                arrow: false,
                            })

                        },

                        onUpdate(props) {
                            suggestionProps = props;

                            if (!props.clientRect) {
                                return
                            }

                            popup[0].setProps({
                                getReferenceClientRect: props.clientRect as any,
                            })
                        },


                        onKeyDown(props) {
                            if (props.event.key === 'Escape') {
                                popup[0].hide();
                                return true;
                            } else if (props.event.key === "ArrowUp") {
                                selectIndex -= 1;
                                if (selectIndex < 0) {
                                    selectIndex = blockKey.length - 1;
                                }
                                updateElement();
                                return true;
                            } else if (props.event.key === "ArrowDown") {
                                selectIndex += 1;
                                if (selectIndex > blockKey.length - 1) {
                                    selectIndex = 0;
                                    }
                                updateElement();
                                return true;
                            } else if (props.event.key === "Enter") {
                                suggestionProps.command({
                                    type: blockKey[selectIndex]
                                })
                                return true;
                            }
                            return false;
                        },

                        onExit() {
                            popup[0].destroy()
                            element.remove()
                        },
                    }
                }
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})