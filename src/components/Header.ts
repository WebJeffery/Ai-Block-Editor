import {AiEditorOptions, AiEditorEvent, CustomMenu, InnerEditor} from "../core/AiEditor.ts";
import {EditorEvents} from "@tiptap/core";
import { AbstractPopoverButton } from "./AbstractPopoverButton.ts";
import tippy from "tippy.js";
import {t} from "i18next";
import { elementUuid } from "../util/uuid.ts"
import { createElement } from "../util/dom.ts";


export type MenuButtonOptions = {
    key: string,
    title: string,
    svg: string,
}

const defaultMenus = ["undo", "redo", "brush", "eraser", "divider", "heading", "font-family", "font-size", "divider", "bold", "italic", 
    "underline", "strike", "link", "code", "subscript", "superscript", "hr", "todo", "emoji", "divider", "highlight", "font-color", "divider"
    , "align", "line-height", "divider", "bullet-list", "ordered-list", "quote", "indent-decrease", "indent-increase", "break", "divider", 
    "image", "video", "attachment", "container", "code-block", "table", "divider", "fullscreen", 
    // "printer", "ai"
];

type toobarItem = {
    id: string,
    key: string,
    text: string,
    tips: string
    icon?: string,
    execute?: any
}

const formatToolbar = (toolbar: (string | toobarItem)[]) => {
    return toolbar.map(value => {
        if (typeof value === 'string') {
            return {
                id: elementUuid(),
                key: value,
            }
        } else {
            return {
                ...value,
                id: value.id || elementUuid(),
                key: value.key || 'custom'
            }
        }
    })

}


export class Header extends HTMLElement implements AiEditorEvent {
    // template:string;
    menuButtons: AbstractPopoverButton[] = [];

    constructor() {
        super();
    }

    onCreate(event: EditorEvents["create"], options: AiEditorOptions): void {
        let toolbarKeys = (options.toolbarKeys || defaultMenus) as string [];
        let toolbarList = formatToolbar(toolbarKeys)

        if (event.editor.options?.onFormatToolbar) {
            toolbarList = event.editor.options?.onFormatToolbar(toolbarList)
        }

        for (let toolbar of toolbarList) {
            let toolbarKey = toolbar.key
            if (!toolbarKey) continue;

            try {
                if (toolbarKey !== "custom") {
                    toolbarKey = toolbarKey.trim();
                    if (toolbarKey === "|") {
                        toolbarKey = "divider"
                    }
                    const menuButton = createElement("aie-" + toolbarKey, { className: 'aie-menu-item', id: toolbar.id }) as AbstractPopoverButton;
                    menuButton.onCreate(event, options);

                    if (toolbarKey !== "divider") {
                        // 提示文本
                        const tip = t(toolbarKey) as string;
                        tip && menuButton.onPopover?.(tip)
                    }
                    this.menuButtons.push(menuButton);
                } else {
                    const customMenuConfig = toolbarKey as CustomMenu;
                    const menuButton = document.createElement("aie-custom") as AbstractPopoverButton;
                    menuButton.classList.add("aie-menu-item")
                    if (customMenuConfig.id) {
                        menuButton.setAttribute("id", customMenuConfig.id);
                    }
                    if (customMenuConfig.className) {
                        menuButton.classList.add(customMenuConfig.className);
                    }
                    menuButton.onCreate(event, options);
                    menuButton.onConfig(customMenuConfig);

                    if (customMenuConfig.tip) {
                        const tip = t(customMenuConfig.tip) as string;
                        tip && menuButton.onPopover(tip)
                    }

                    if (customMenuConfig.onCreate) {
                        customMenuConfig.onCreate(menuButton, (event.editor as InnerEditor).aiEditor);
                    }

                    this.menuButtons.push(menuButton);
                }
            } catch (e) {
                console.error("Can not create toolbar by key: " + toolbarKey);
            }
        }
    }

    onTransaction(event: EditorEvents["transaction"]): void {
        for (let menuButton of this.menuButtons) {
            menuButton.onTransaction(event);
        }
    }

    // 自定义元素添加至页面
    connectedCallback() {
        const divElement = document.createElement("div");
        for (let menuButton of this.menuButtons) {
            divElement.appendChild(menuButton);
        }
        divElement.style.display = "flex"
        divElement.style.flexWrap = "wrap"
        this.appendChild(divElement)
    }
    
    //   disconnectedCallback() {
    //     console.log("自定义元素从页面中移除。");
    //   }
    
    //   adoptedCallback() {
    //     console.log("自定义元素移动至新页面。");
    //   }
    
    //   attributeChangedCallback() {
    //     console.log(`属性已变更。`);
    //   }


}



